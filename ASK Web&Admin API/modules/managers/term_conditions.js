'use strict';

let BadRequestError = require('../errors/badRequestError'),
    TermsConditionModal = require('../models/terms_condition'),
    ObjectId = require('mongoose').Types.ObjectId;

let addTermsCondition = async (body) => {
    let updateData = {};
    let optionalFiled = ["pagetitle", "description", "seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await TermsConditionModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await TermsConditionModal(updateData).save();
    } else {
        await TermsConditionModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getTermsCondition = async (body) => {
    let initialData = await TermsConditionModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
//website
let getTermsConditionForWebsite = async (body) => {
    let initialData = await TermsConditionModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
module.exports = {
    addTermsCondition,
    getTermsCondition,
    //website  
    getTermsConditionForWebsite
};