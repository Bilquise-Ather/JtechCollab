'use strict';

let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    RoomModel = require('../models/rooms'),
    ColorModal = require('../models/colors'),
    ProductOptionModel = require('../models/product_options'),
    ProductModel = require('../models/product'),
    CollectionModel = require('../models/collection'),
    RoomPathModel = require('../models/rooms_path'),
    ObjectId = require('mongoose').Types.ObjectId;


let getAllSlideForWebsite = async (body) => {
    let allSlider = await RoomModel.aggregate([
        { $match: {} },
        { $sort: {created_at:1} },
        {
            $lookup: {
                from: "rooms_path",
                let: { room_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$room_id", "$$room_id"] }
                        }
                    },
                    { $project: { pathdata: 1 } }
                ],
                as: "room_path"
            }
        }
    ])
        .exec()

    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.room_image_folder + element.image;
    });
    return allSlider;
}

let getAllColor = async (body) => {
    return ColorModal
        .find()
        .sort({ name: 1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}

let getSearchedRoom = async (body) => {
    // color,collection,text,roomid
    // room id base par new floor
    // new floor mathi product options
    let findData = {}
    let colorfilter = {}
    let searchTextFilter = {}
    findData = {room_id: ObjectId(body.roomid)} 
    if (body) {
        if (body.collection != "all") {
            findData["$and"] = [
                {collections: { $in: [ObjectId(body.collection)] }}
            ]                   
        } else {
            let allSlider = await CollectionModel
                .find({ showinvisualiser: true })
                .sort({ name: 1 })
                .collation({ 'locale': 'en' })
                .select({ _id: 1 })
                .lean()
                .exec()
                findData["$and"] = [
                    {collections: { $in: allSlider.map(a => ObjectId(a._id.toString())) }}
                ]       
            
        }
        if (body.color != "all") {
            colorfilter = { $in: [body.color, "$selectedcolor"] }
        }
        if (body.text != "") {
            searchTextFilter = { $regexMatch: { input: "$name", regex: new RegExp(body.text, 'ig') } }
        }
    }
    

    let rooms = await RoomPathModel.aggregate([
        { $match:  findData  }
        , {
            $lookup: {
                from: "product_option",
                let: { productoption_id: "$productoption_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$_id", "$$productoption_id"] },
                                    colorfilter, searchTextFilter
                                ]
                            }
                        },

                    },
                    { $project: { _id: 1, name: 1, image: 1,selectedcolor:1,selectedsize:1,selectedthickness:1,selectedwearlayer:1,selectedcore:1,packaging:1,itemno:1,slug:1 } }
                ],
                as: "floor"
            }
        }
    ])
    .exec()

    rooms = rooms.filter(r => r.floor.length > 0)
    rooms.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.room_image_folder + element.image;
        element.floor[0].image = config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element.floor[0].image;

    });
    
         let page_number = body.page ? body.page : 1;
        let page_size = body.limit ? body.limit : 20;
       return {rooms:rooms.slice((page_number - 1) * page_size, page_number * page_size),total:rooms.length};
       // return productOptions;
    //     let allProduct = await ProductModel.aggregate([
    //          { $match: findData },       
    //        {
    //             $lookup: {
    //                 from: "product_option",
    //                 let: { master_product_id: "$_id" },
    //                 pipeline: [
    //                     {
    //                         $match: {
    //                             $expr: {
    //                                 $and: [
    //                                     { $eq: ["$productid", "$$master_product_id"] },
    //                                     colorfilter,searchTextFilter
    //                                 ]
    //                             }
    //                         },


    //                     }
    //                 ],
    //                 as: "products"
    //             }
    //         }
    //     ]).exec()

    //     let productOptions = []
    //     allProduct.forEach(x => {
    //          productOptions = [...productOptions, ...x.products];
    //     })
    //     productOptions.forEach(x => {
    //         //x.image = "https://api.allsouthflooring.com/uploads/product_option_image/"+x.image
    //         x.image = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + x.image;
    //         x.visualiserimage = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + x.visualiserimage;

    //    })
  
}

let getRoomDetails = async (body) => {

    if (!body.roomid) {
        throw new BadRequestError("Blank room Id supplied!");
    }

    let productoption_id = await RoomPathModel
        .find({ room_id: body.roomid })
        .select({ productoption_id: 1 })
        .collation({ 'locale': 'en' })
        .lean()
        .exec()

console.log("productoption_id",productoption_id);


    let productoptionId = productoption_id.map(ids => ids.productoption_id.toString())
    productoptionId = _.uniqBy(productoptionId);
    

    let selected_colors = await ProductOptionModel
        .find({ _id: { $in: productoptionId } })
        .select({ selectedcolor: 1 })
        .collation({ 'locale': 'en' })
        .lean()
        .exec()

    let finalcolors = []
    selected_colors.forEach(element => {
        if (element.selectedcolor) {
            finalcolors = [...finalcolors, ...element.selectedcolor]
        }
    });
    
    
    
    finalcolors = _.uniqBy(finalcolors);
    finalcolors = finalcolors.map((x) => { return {name:x.toString()}} );
    
    return { colors: finalcolors };

}

module.exports = {
    getAllSlideForWebsite,
    getAllColor,
    getSearchedRoom,
    getRoomDetails
};