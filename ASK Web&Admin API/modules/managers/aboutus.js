'use strict';
let ObjectId = require('mongodb').ObjectID;
let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    AboutUsModel = require('../models/about_us');
let getAboutUs = async () => {
    let initialData = await AboutUsModel.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    if (initialData) {
        initialData.introimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.introimage;
        initialData.bannerimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.bannerimage;
    }
    return initialData;
}
let addAboutUs = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let f1;
    let optionalFiled = ["pagetitle", "subtitle", "content", "introtitle", "introcontent", "countericon1", "countertitle1", "counternumber1", "countericon2", "countertitle2", "counternumber2", "countericon3", "countertitle3", "counternumber3", "countericon4", "countertitle4", "counternumber4", "seotitle", "seodescription", "seokeyword"];
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
    let introimage = body.uploaded_files.filter(fl => fl.type == "introimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "introimage")[0].imageactualname : ""
    if (introimage) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == introimage.toString() })[0];
        if (f1) {
            updateData["introimage"] = f1.filename;
        }
    }
    let isAvailable = await AboutUsModel
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await AboutUsModel(updateData).save();
    } else {
        await AboutUsModel
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getAboutUsWebsite = async () => {
    let initialData = await AboutUsModel.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    if (initialData) {
        initialData.introimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.introimage;
        initialData.bannerimage = config.upload_folder + config.upload_entities.about_us_image_folder + initialData.bannerimage;
    }
    return initialData;
}


module.exports = {
    getAboutUs,
    addAboutUs,
    getAboutUsWebsite
};