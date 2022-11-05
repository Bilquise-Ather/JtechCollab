'use strict';

let BadRequestError = require('../errors/badRequestError'),
    FaqsModal = require('../models/faqs'),
    FaqsSeoModal = require('../models/faqs_seo'),
    SearchSeoModal = require('../models/search_seo'),
    ProjectSeoModal = require('../models/projects_seo'),
    VisualiserSeoModal = require('../models/visualiser_seo'),
    GallerySeoModal = require('../models/gallery_seo'),
    ObjectId = require('mongoose').Types.ObjectId;

let addFaqs = async (req) => {
    let body = req.body;
    if (!body.quetion) {
        throw new BadRequestError('Quetion can not empty');
    }
    if (!body.answer) {
        throw new BadRequestError('Answer can not empty');
    }
    let sliderData = {
        quetion: body.quetion,
        answer: body.answer,
    }
    let slideAdded = await FaqsModal(sliderData).save();
    return slideAdded;
}

let getAllFaqs = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};

    let allFaqs = await FaqsModal
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    let totalRecords = await FaqsModal.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allFaqs;
    _result.total_count = totalRecords;
    return _result;
}

let updateFaqs = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.quetion) {
        throw new BadRequestError('Quetion can not empty');
    }
    if (!body.answer) {
        throw new BadRequestError('Answer can not empty');
    }
    let updateData = {};
    let optionalFiled = ["quetion", "answer", "seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let ans = await FaqsModal
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();
    let faqsAdded = await FaqsModal
        .findOne({ _id: ObjectId(req.params.slider_id) })
        .lean()
        .exec();

    return faqsAdded;
}
let deleteFaqs = async (id) => {
    return await FaqsModal
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let getAllFaqsForWebsite = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};

    let allFaqs = await FaqsModal
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    let totalRecords = await FaqsModal.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allFaqs;
    _result.total_count = totalRecords;
    return _result;
}
let addFaqsSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await FaqsSeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await FaqsSeoModal(updateData).save();
    } else {
        await FaqsSeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getFaqsSeo = async (body) => {
    let initialData = await FaqsSeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
let addSearchSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await SearchSeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await SearchSeoModal(updateData).save();
    } else {
        await SearchSeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getSearchSeo = async (body) => {
    let initialData = await SearchSeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
let addProjectSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await ProjectSeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await ProjectSeoModal(updateData).save();
    } else {
        await ProjectSeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getProjectSeo = async (body) => {
    let initialData = await ProjectSeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
let addGallerySeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await GallerySeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await GallerySeoModal(updateData).save();
    } else {
        await GallerySeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getGallerySeo = async (body) => {
    let initialData = await GallerySeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
let addVisualiserSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await VisualiserSeoModal
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await VisualiserSeoModal(updateData).save();
    } else {
        await VisualiserSeoModal
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getVisualiserSeo = async (body) => {
    let initialData = await VisualiserSeoModal.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}
module.exports = {
    addFaqs,
    getAllFaqs,
    updateFaqs,
    deleteFaqs,
    addFaqsSeo,
    getFaqsSeo,
    addSearchSeo,
    getSearchSeo,
    addProjectSeo,
    getProjectSeo,
    addGallerySeo,
    getGallerySeo,
    addVisualiserSeo,
    getVisualiserSeo,
    //website
    getAllFaqsForWebsite
};