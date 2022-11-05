'use strict';

let BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    SliderModel = require('../models/rooms'),
    ObjectId = require('mongoose').Types.ObjectId;

let addSlider = async (req) => {   
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.slidertext) {
        throw new BadRequestError('Slider text can not empty');
    }
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
        slidertext: body.slidertext
    }
    let slideAdded = await SliderModel(sliderData).save();
    slideAdded.image = config.upload_folder + config.upload_entities.room_image_folder + slideAdded.image;
    return slideAdded;


}

let getAllSlider = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    let allSlider = await SliderModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    allSlider.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.room_image_folder + element.image;
    });

    let totalRecords = await SliderModel.countDocuments();

    let _result = { total_count: 0 };
    _result.slides = allSlider;
    _result.total_count = totalRecords;
    return _result;
}

let updateSlider = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body.slidertext) {
        throw new BadRequestError('Slider text can not empty');
    }

    let updateData = {};
    let optionalFiled = ["slidertext"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }


    let ans = await SliderModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();
    let slideAdded = await SliderModel
        .findOne({ _id: ObjectId(req.params.slider_id) })
        .lean()
        .exec();
    slideAdded.image = config.upload_folder + config.upload_entities.room_image_folder + slideAdded.image;
    return slideAdded;
}

let deleteSlider = async (id) => {
    return await SliderModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();

}
let getAllSlideForWebsite = async (body) => {

    let allSlider = await SliderModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()

    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.room_image_folder + element.image;
    });


    return allSlider;
}

module.exports = {
    addSlider,
    getAllSlider,
    updateSlider,
    deleteSlider,

    //Website
    getAllSlideForWebsite
};