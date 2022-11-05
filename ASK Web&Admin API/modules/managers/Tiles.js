'use strict';
let ObjectId = require('mongodb').ObjectID;
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    AboutUsModel = require('../models/about_us'),
    Tiles19Model = require('../models/Tiles19'),
    Tiles24Model = require('../models/Tiles24'),
    TilesDataModel = require('../models/Tiles_data');

let getTiles19 = async () => {
    let initialData = await Tiles19Model.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    if (initialData) {
        initialData.bannerimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.bannerimage;
    }
    return initialData;
}
let addTiles = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let f1;
    let optionalFiled = ["seotitle", "seodescription", "seokeyword","pagetitle","description","videolink"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });
    let bannerimage = body.uploaded_files.filter(fl => fl.type == "bannerimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "bannerimage")[0].imageactualname : ""
    if (bannerimage) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == bannerimage.toString() })[0];
        if (f1) {
            updateData["bannerimage"] = f1.filename;
        }
    }
    
    let isAvailable = await Tiles19Model
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await Tiles19Model(updateData).save();
    } else {
        await Tiles19Model
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getTiles24 = async () => {
    let initialData = await Tiles24Model.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    if (initialData) {
        initialData.bannerimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.bannerimage;
    }
    return initialData;
}
let addTiles24 = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let f1;
    let optionalFiled = ["seotitle", "seodescription", "seokeyword","pagetitle","description","videolink"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });
    let bannerimage = body.uploaded_files.filter(fl => fl.type == "bannerimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "bannerimage")[0].imageactualname : ""
    if (bannerimage) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == bannerimage.toString() })[0];
        if (f1) {
            updateData["bannerimage"] = f1.filename;
        }
    }
    
    let isAvailable = await Tiles24Model
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await Tiles24Model(updateData).save();
    } else {
        await Tiles24Model
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}

let getTilesForAdmin = async () => {
    let tiles19 = await Tiles19Model
    .findOne()
    .select({ _id: 1 })
    .lean()
    .exec();

    let tiles24 = await Tiles24Model
    .findOne()
    .select({ _id: 1 })
    .lean()
    .exec();

    let arr = []
    if(tiles19)
        arr.push({_id:tiles19._id,name:"19x19"});
    if(tiles24)
         arr.push({_id:tiles24._id,name:"24x24"})
    return arr;
}



let addTileData = async (req) => {   
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.description) {
        throw new BadRequestError('Description can not empty');
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
        description: body.description,
        mainproduct: body.mainproduct,
    }
    let slideAdded = await TilesDataModel(sliderData).save();
    slideAdded.image = config.upload_folder + config.upload_entities.slider_image_folder + slideAdded.image;
    return slideAdded;


}

let getAllTileData = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    let allSlider = await TilesDataModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

        let tiles19 = await Tiles19Model
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    
        let tiles24 = await Tiles24Model
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    
        let arr = []
        if(tiles19)
            arr.push({_id:tiles19._id,name:"19x19"});
        if(tiles24)
             arr.push({_id:tiles24._id,name:"24x24"})

    allSlider.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.slider_image_folder + element.image;
        element.tilename = element.mainproduct ? arr.filter((tile)=> tile._id.toString() == element.mainproduct.toString())[0].name : ""
    });

    let totalRecords = await TilesDataModel.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allSlider;
    _result.total_count = totalRecords;
    return _result;
}

let updateTileData = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.description) {
        throw new BadRequestError('Description can not empty');
    }

    let updateData = {};
    let optionalFiled = ["description","mainproduct"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }


    let ans = await TilesDataModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();
    let slideAdded = await TilesDataModel
        .findOne({ _id: ObjectId(req.params.slider_id) })
        .lean()
        .exec();
    slideAdded.image = config.upload_folder + config.upload_entities.slider_image_folder + slideAdded.image;
    return slideAdded;
}

let deleteTileData = async (id) => {
    return await TilesDataModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();

}


let getTiles19DataWebsite = async () => {
    let initialData = await Tiles19Model.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    if (initialData) {     
        initialData.bannerimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.bannerimage;
    }
    let colorData = await TilesDataModel.find({mainproduct:ObjectId(initialData._id)}).collation({ 'locale': 'en' }).select().lean().exec()
    colorData.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.slider_image_folder + element.image;        
    });
    initialData.colors = colorData;
    return initialData;
}
let getTiles24DataWebsite = async () => {
    let initialData = await Tiles24Model.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    if (initialData) {     
        initialData.bannerimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.bannerimage;
    }
    
    let colorData = await TilesDataModel.find({mainproduct:ObjectId(initialData._id)}).collation({ 'locale': 'en' }).select().lean().exec()
    colorData.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.slider_image_folder + element.image;        
    });
    initialData.colors = colorData;
    return initialData;
}
module.exports = {
    getTiles19,
    addTiles,
    getTiles24,
    addTiles24,
    getTilesForAdmin,
    addTileData,
    getAllTileData,
    updateTileData,
    deleteTileData,
    getTiles24DataWebsite,
    getTiles19DataWebsite
};