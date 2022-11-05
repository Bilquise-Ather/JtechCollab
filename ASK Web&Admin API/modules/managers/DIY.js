'use strict';

let BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    DIYModel = require('../models/DIY'),
    DIYSeoModal = require('../models/DIY_seo'),
    ObjectId = require('mongoose').Types.ObjectId;

let addDIY = async (req) => {   
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    let filename = "";
    try {
        filename = req.file.filename;
    }
    catch (error) {
    }

    if (!filename) {
        throw new BadRequestError('Upload Any Image');
    }
    let DIYData = {
        image: filename,
    }
    let DIYAdded = await DIYModel(DIYData).save();
    DIYAdded.image = config.upload_folder + config.upload_entities.DIY_image_folder + DIYAdded.image;
    return DIYAdded;


}

let getAllDIY = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    let allDIY = await DIYModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    allDIY.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.DIY_image_folder + element.image;
    });

    let totalRecords = await DIYModel.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allDIY;
    _result.total_count = totalRecords;
    return _result;
}

let updateDIY = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;

    let updateData = {};

    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }


    await DIYModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();
    let DIYAdded = await DIYModel
        .findOne({ _id: ObjectId(req.params.slider_id) })
        .lean()
        .exec();
    DIYAdded.image = config.upload_folder + config.upload_entities.DIY_image_folder + DIYAdded.image;
    return DIYAdded;
}

let deleteDIY = async (id) => {
    return await DIYModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();

}
let getAllDIYForWebsite = async () => {

    let allDIY = await DIYModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()

    allDIY.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.DIY_image_folder + element.image;
    });


    return allDIY;
}

let addDIYSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["text","seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await DIYSeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await DIYSeoModal(updateData).save();
    } else {
        await DIYSeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getDIYSeo = async (body) => {
    let initialData = await DIYSeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}

module.exports = {
    addDIY,
    getAllDIY,
    updateDIY,
    deleteDIY,
    addDIYSeo,
    getDIYSeo,
    //Website
    getAllDIYForWebsite
};