'use strict';

let BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    SliderModel = require('../models/rooms_path'),
    RoomsModel = require('../models/rooms'),
    ProductOptionsModel = require('../models/product_options'),
    ObjectId = require('mongoose').Types.ObjectId;

let addSlider = async (req) => {   
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;

    if (!body.room_id) {
        throw new BadRequestError('Room text can not empty');
    }
    if (!body.productoption_id) {
        throw new BadRequestError('Floor can not empty');
    }
    
    if (!body.label) {
        throw new BadRequestError('Label text can not empty');
    }
    let filename = "";
    try {
        filename = req.file.filename;
    }
    catch (error) {
    }

    if (!filename) {
        throw new BadRequestError('Upload Any Image');
    }
    
    let sliderData = {       
        image: filename,        
        room_id: body.room_id,
        productoption_id: body.productoption_id,
        label: body.label,
        collections : Array.isArray(body.collections) ? body.collections : []
    }
    let slideAdded = await SliderModel(sliderData).save();   
    let allSlider = await SliderModel.aggregate([
        { $match: {_id: ObjectId(slideAdded._id)} },      
        {
            $lookup: {
                from: "rooms",
                let: { room_id: "$room_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$room_id"] }
                        }
                    },
                    { $project: { _id: 0, slidertext: 1 } }
                ],
                as: "category"
            }
        },{
            $lookup: {
                from: "product_option",
                let: { productoption_id: "$productoption_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$productoption_id"] }
                        }
                    },
                    { $project: { _id: 0, name: 1 } }
                ],
                as: "floor"
            }
        },

    ])
        .exec() 
        allSlider[0].image = config.upload_folder + config.upload_entities.room_image_folder + allSlider[0].image;
    return allSlider[0];


}

let getAllSlider = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
        let allSlider = await SliderModel.aggregate([
            { $match: findData },
            { $skip: offset },
            { $limit: limit },
            { $sort: {created_at:-1} },
            {
                $lookup: {
                    from: "rooms",
                    let: { room_id: "$room_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$room_id"] }
                            }
                        },
                        { $project: { _id: 0, slidertext: 1 } }
                    ],
                    as: "category"
                }
            },{
                $lookup: {
                    from: "product_option",
                    let: { productoption_id: "$productoption_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$productoption_id"] }
                            }
                        },
                        { $project: { _id: 0, name: 1 } }
                    ],
                    as: "floor"
                }
            }
        ])
            .exec()   
   
  
            allSlider.forEach(element => {
                element.image = config.upload_folder + config.upload_entities.room_image_folder + element.image;
            });
    let totalRecords = await SliderModel.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allSlider;
    _result.total_count = totalRecords;
    return _result;
}
let getAllRooms = async (body) => {
    
    return RoomsModel
        .find({})
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })        
        .select({slidertext:1})
        .lean()
        .exec()

}
let getAllProductOptions = async (body) => {
    
    return ProductOptionsModel
        .find({})
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })        
        .select({name:1})
        .lean()
        .exec()

    
}

let updateSlider = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
   
    if (!body.room_id) {
        throw new BadRequestError('Room text can not empty');
    }
    if (!body.productoption_id) {
        throw new BadRequestError('Floor can not empty');
    }
    
    if (!body.label) {
        throw new BadRequestError('Label text can not empty');
    }
      
    let updateData = {};
    let optionalFiled = ["room_id","label","productoption_id","collections"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });
    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }
    let ans = await SliderModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();
        let allSlider = await SliderModel.aggregate([
            { $match: {_id: ObjectId(req.params.slider_id)} },      
            {
                $lookup: {
                    from: "rooms",
                    let: { room_id: "$room_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$room_id"] }
                            }
                        },
                        { $project: { _id: 0, slidertext: 1 } }
                    ],
                    as: "category"
                }
            },{
                $lookup: {
                    from: "product_option",
                    let: { productoption_id: "$productoption_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$productoption_id"] }
                            }
                        },
                        { $project: { _id: 0, name: 1 } }
                    ],
                    as: "floor"
                }
            }
        ])
            .exec() 
            allSlider[0].image = config.upload_folder + config.upload_entities.room_image_folder + allSlider[0].image;
        return allSlider[0];
}

let deleteSlider = async (id) => {
    return  SliderModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();

}
let getAllSlideForWebsite = async (body) => {

    let allSlider = await SliderModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()

    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.room_image_folder + element.image;
    });


    return allSlider;
}

module.exports = {
    addSlider,
    getAllSlider,
    updateSlider,
    deleteSlider,
    getAllRooms,
    getAllProductOptions,
    //Website
    getAllSlideForWebsite
};