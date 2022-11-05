'use strict';
let ObjectId = require('mongodb').ObjectID;
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),

    config = process.config.global_config,
    CommonSettingModel = require('../models/common_settings');

let getInitialData = async (req) => {
    let initialData = await CommonSettingModel
        .findOne({ logo: { $ne: null } })
        .collation({ 'locale': 'en' })
        .lean()
        .exec()
    if (initialData) {
        initialData.logo = config.upload_folder + config.upload_entities.logo_icon + initialData.logo;
    }
    let _result = initialData;
    return _result;
}

let updateCommonSettings = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let optionalLogoFiled = ["facebook", "linkedin", "instagram","twitter", "call", "email", "address", "map"];
    optionalLogoFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });
    if (req.file && req.file.path) {
        updateData["logo"] = req.file.filename;
    }
    let test = await CommonSettingModel
        .findOne({ logo: { $ne: null } })
        .collation({ 'locale': 'en' })
        .lean()
        .exec()
    if (test) {
        let ans = await CommonSettingModel
            .updateOne({ _id: ObjectId(test._id) }, { $set: updateData })
            .exec();
    } else {
        await CommonSettingModel(updateData).save();
        //save
    }
    let logoAdded = await CommonSettingModel
        .findOne()
        .lean()
        .exec();
    logoAdded.logo = config.upload_folder + config.upload_entities.logo_icon + logoAdded.logo;
    return logoAdded;
}
let getInitialDataForWebsite = async (req) => {
    let initialData = await CommonSettingModel
        .findOne()
        .collation({ 'locale': 'en' })
        .select({ call: 1, email: 1, address: 1, map: 1 })
        .lean()
        .exec()
    let _result = initialData;
    return _result;
}

module.exports = {
    getInitialData,
    updateCommonSettings,
    //website
    getInitialDataForWebsite
};