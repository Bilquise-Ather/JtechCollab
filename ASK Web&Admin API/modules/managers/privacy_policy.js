'use strict';

let BadRequestError = require('../errors/badRequestError'),
    PrivacyPolicyModal = require('../models/privacy_policy'),
    ObjectId = require('mongoose').Types.ObjectId;

let getPrivacyPolicyForWebsite = async (body) => {
    let initialData = await PrivacyPolicyModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
let addPrivacyPolicy = async (body) => {
    let updateData = {};
    let optionalFiled = ["pagetitle", "description", "seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await PrivacyPolicyModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await PrivacyPolicyModal(updateData).save();
    } else {
        await PrivacyPolicyModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getPrivacyPolicy = async (body) => {
    let initialData = await PrivacyPolicyModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
module.exports = {
    addPrivacyPolicy,
    getPrivacyPolicy,
    getPrivacyPolicyForWebsite
};