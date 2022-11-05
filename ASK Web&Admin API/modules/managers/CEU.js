'use strict';
let ObjectId = require('mongodb').ObjectID;
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),

    config = process.config.global_config,
    CEUSeoModal = require('../models/CEU_seo'),
    CEUModel = require('../models/CEU');

let getCEUData = async (req) => {
    let initialData = await CEUModel
        .findOne({ image: { $ne: null } })
        .collation({ 'locale': 'en' })
        .lean()
        .exec()
    if (initialData) {
        initialData.image = config.upload_folder + config.upload_entities.CEU_image_folder + initialData.image;
    }
    let _result = initialData;
    return _result;
}

let updateCEU = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let optionalLogoFiled = ["text"];
    optionalLogoFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });
    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }
    let test = await CEUModel
        .findOne({ image: { $ne: null } })
        .collation({ 'locale': 'en' })
        .lean()
        .exec()
    if (test) {
        let ans = await CEUModel
            .updateOne({ _id: ObjectId(test._id) }, { $set: updateData })
            .exec();
    } else {
        await CEUModel(updateData).save();
        //save
    }
    let logoAdded = await CEUModel
        .findOne()
        .lean()
        .exec();
    logoAdded.image = config.upload_folder + config.upload_entities.CEU_image_folder + logoAdded.image;
    return logoAdded;
}
let getCEUForWebsite = async (req) => {
    let initialData = await CEUModel
        .findOne()
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
    
    initialData.image = config.upload_folder + config.upload_entities.CEU_image_folder + initialData.image;
    let _result = initialData;
    return _result;
}
let addCEUSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await CEUSeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await CEUSeoModal(updateData).save();
    } else {
        await CEUSeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getCEUSeo = async (body) => {
    let initialData = await CEUSeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
module.exports = {
    getCEUData,
    updateCEU,
    addCEUSeo,
    getCEUSeo,
    //website
    getCEUForWebsite
};