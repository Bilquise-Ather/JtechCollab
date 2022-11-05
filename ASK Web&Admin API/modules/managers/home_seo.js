'use strict';

let BadRequestError = require('../errors/badRequestError'),
    HomeSeoModal = require('../models/home_seo'),
    ObjectId = require('mongoose').Types.ObjectId;

let addHomeSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await HomeSeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await HomeSeoModal(updateData).save();
    } else {
        await HomeSeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getHomeSeo = async (body) => {
    let initialData = await HomeSeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
module.exports = {
    addHomeSeo,
    getHomeSeo
};