'use strict';

let BadRequestError = require('../errors/badRequestError'),
footerWebsiteDataModal = require('../models/footer_website_data'),
CollectionModal = require('../models/collection'),
CommonSettingModel = require('../models/common_settings'),
    ObjectId = require('mongoose').Types.ObjectId;

let addFooterWebsiteData = async (body) => {
    let updateData = {};
    let optionalFiled = ["companyname", "companyshortdescription", "copyrighttext"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await footerWebsiteDataModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await footerWebsiteDataModal(updateData).save();
    } else {
        await footerWebsiteDataModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getFooterWebsiteData = async (body) => {
    let initialData = await footerWebsiteDataModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
//website
let getFooterWebsiteDataForWebsite = async (body) => {

    let initialData = await footerWebsiteDataModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    let collectionData = await CollectionModal.find().collation({ 'locale': 'en' }).select({name:1,slug:1,link:1}).sort({name:1}).lean().exec()
    let socialLink = await CommonSettingModel.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return {collections:collectionData,commondata:initialData,social: socialLink};
}
module.exports = {
    addFooterWebsiteData,
    getFooterWebsiteData,
    //website  
    getFooterWebsiteDataForWebsite
};