'use strict';

let _ = require("lodash"),
    helpers = require('../helpers/helpers'),
    BadRequestError = require('../errors/badRequestError'),
    AccessDeniedError = require('../errors/accessDeniedError'),
    md5 = require('md5'),
    ejs = require('ejs'),
    fs = require('fs'),
    path = require('path'),
    config = process.config.global_config,
    validator = require('validator'),
    IconModel = require('../models/icon'),
    ObjectId = require('mongoose').Types.ObjectId;

let addIcon = async (req) => {
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
    let sliderData = {
        image: filename,
        link:body.link
    }
    let iconAdded = await IconModel(sliderData).save();
    iconAdded.image = config.upload_folder + config.upload_entities.icon_folder + iconAdded.image;
    return iconAdded;


}

let getAllIcon = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};

    let allIcon = await IconModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()
    allIcon.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.icon_folder + element.image;
    });

    let totalRecords = await IconModel.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allIcon;
    _result.total_count = totalRecords;
    return _result;
}

let updateIcon = async (req) => {
    let updateData = {};
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;

    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }
    updateData["link"] = body.link;
    await IconModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();

    let iconAdded = await IconModel
        .findOne({ _id: ObjectId(req.params.slider_id) })
        .lean()
        .exec();
    iconAdded.image = config.upload_folder + config.upload_entities.icon_folder + iconAdded.image;
    return iconAdded;
}

let deleteIcon = async (id) => {
    return await IconModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let getAllIconForWebsite = async (body) => {

    let allSlider = await IconModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ image: 1,link:1 })
        .lean()
        .exec()

    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.icon_folder + element.image;
    });


    return allSlider;
}
module.exports = {
    addIcon,
    getAllIcon,
    updateIcon,
    deleteIcon,

    //Website
    getAllIconForWebsite
};