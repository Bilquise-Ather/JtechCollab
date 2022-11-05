'use strict';

let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    CategoryModel = require('../models/category'),
    ObjectId = require('mongoose').Types.ObjectId;

let addCategory = async (req) => {
    let body = req.body.body ? JSON.parse(req.body.body) : req.body;
    if (!body) {
        throw new BadRequestError('Category can not empty');
    }
    let category_image = "";
    let award_image = "";
    let video_image = "";
    let banner_image = "";
    let smallicon_image = "";
    
    try {
        req.files.forEach(image => {
            if (image.fieldname == "category_image") {
                category_image = image.filename;
            }
            if (image.fieldname == "award_image") {
                award_image = image.filename;
            }
            if (image.fieldname == "video_image") {
                video_image = image.filename;
            }
            if (image.fieldname == "banner_image") {
                banner_image = image.filename;
            }
            if (image.fieldname == "smallicon_image") {
                smallicon_image = image.filename;
            }
        })
    }
    catch (error) {
    }
    if (!category_image) {
        throw new BadRequestError('Upload Category Image');
    }
    
    let sliderData = {
        category_image: category_image,
        award_image: award_image,
        video_image: video_image,
        banner_image: banner_image,
        smallicon_image: smallicon_image,
        displayorder:body.displayorder,
        name: body.name,
        slug: body.slug,
        link: body.link,
        bigtext: body.bigtext,
        seotitle: body.seotitle,
        seodescription: body.seodescription,
        seokeyword: body.seokeyword,
        toprelatedprojects: body.toprelatedprojects,        
        bottomrelatedprojects: body.bottomrelatedprojects,        
        video: body.video,
        smalltext: body.smalltext,
        buttontext: body.buttontext,
        buttonlink: body.buttonlink
    }
    let option_images = []
    let productOptionImages = body.uploaded_files.filter(fl => fl.type == "productoption")

    let f1;
    for (const i in productOptionImages) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productOptionImages[i].imageactualname.toString() })[0];

        f1 ? option_images.push(f1.filename) : ""
    }

    sliderData["option_images"] = option_images;
    sliderData["option_images"] = sliderData["option_images"].concat(body.remaining_url)

    let catrgoryAdded = await CategoryModel(sliderData).save();
    catrgoryAdded.category_image = config.upload_folder + config.upload_entities.category_folder + catrgoryAdded.category_image;
    if(catrgoryAdded.award_image){catrgoryAdded.award_image = config.upload_folder + config.upload_entities.category_folder + catrgoryAdded.award_image;}
    if(catrgoryAdded.video_image){catrgoryAdded.video_image = config.upload_folder + config.upload_entities.category_folder + catrgoryAdded.video_image;}
    if(catrgoryAdded.banner_image){catrgoryAdded.banner_image = config.upload_folder + config.upload_entities.category_folder + catrgoryAdded.banner_image;}
    if(catrgoryAdded.smallicon_image){catrgoryAdded.smallicon_image = config.upload_folder + config.upload_entities.category_folder + catrgoryAdded.smallicon_image;}

    if (catrgoryAdded.option_images) {
        catrgoryAdded.option_images.forEach(element1 => {
            option_images.push({ image: config.upload_folder + config.upload_entities.category_folder + element1, baseimage: element1 })
        });
    }
    catrgoryAdded.option_images = option_images;
    return catrgoryAdded;


}

let getAllCategory = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { name: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
            ]
        }
    }
    let allCategory = await CategoryModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()
    allCategory.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.category_folder + element.image;

        element.category_image = config.upload_folder + config.upload_entities.category_folder + element.category_image;
        
        
        if(element.award_image){
            element.award_image = config.upload_folder + config.upload_entities.category_folder + element.award_image;
        }
        if(element.video_image){
            element.video_image = config.upload_folder + config.upload_entities.category_folder + element.video_image;
        }
        if(element.banner_image){
            element.banner_image = config.upload_folder + config.upload_entities.category_folder + element.banner_image;
        }
        if(element.smallicon_image){
            element.smallicon_image = config.upload_folder + config.upload_entities.category_folder + element.smallicon_image;
        }
        let option_images = []
        if (element.option_images) {
            element.option_images.forEach(element1 => {
                option_images.push({ image: config.upload_folder + config.upload_entities.category_folder + element1, baseimage: element1 })
            });
        }
        element.option_images = option_images;
    });


    let totalRecords = await CategoryModel.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = allCategory;
    _result.total_count = totalRecords;
    return _result;
}

let updateCategory = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    
    let optionalFiled = ["name", "slug", "bigtext", "video", "smalltext", "buttontext", "buttonlink","link","toprelatedprojects","bottomrelatedprojects","displayorder"];
    optionalFiled.forEach(x => {
        if(x == "video"){
            updateData[x] = body[x];
        }
        else if (body[x]) {
            updateData[x] = body[x];
        }
    });
    updateData["seotitle"] = body["seotitle"]
    updateData["seodescription"] = body["seodescription"]
    updateData["seokeyword"] = body["seokeyword"]
    
    if (req.files.length > 0) {
        req.files.forEach(image => {
            if (image.fieldname == "category_image") {
                updateData["category_image"] = image.filename;
            }
            if (image.fieldname == "award_image") {
                updateData["award_image"] = image.filename;
            }
            if (image.fieldname == "video_image" ) {
                updateData["video_image"] = image.filename;
            }
            if (image.fieldname == "banner_image" ) {
                updateData["banner_image"] = image.filename;
            }
            if (image.fieldname == "smallicon_image" ) {
                updateData["smallicon_image"] = image.filename;
            }
        })
    }
    if(body.video_image == ""){
        updateData["video_image"] = "";
    }
    if(body.award_image == ""){
        updateData["award_image"] = "";
    }
    if(body.banner_image == ""){
        updateData["banner_image"] = "";
    }
    if(body.smallicon_image == ""){
        updateData["smallicon_image"] = "";
    }
    let option_images = []
    let productOptionImages = body.uploaded_files.filter(fl => fl.type == "productoption")

    let f1;
    for (const i in productOptionImages) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productOptionImages[i].imageactualname.toString() })[0];

        f1 ? option_images.push(f1.filename) : ""
    }

    updateData["option_images"] = option_images;
    updateData["option_images"] = updateData["option_images"].concat(body.remaining_url)
    await CategoryModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();

    let categoryAdded = await CategoryModel
        .findOne({ _id: ObjectId(req.params.slider_id) })
        .lean()
        .exec();
       
        if (categoryAdded.option_images) {
            categoryAdded.option_images.forEach(element1 => {
                option_images.push({ image: config.upload_folder + config.upload_entities.category_folder + element1, baseimage: element1 })
            });
        }
        categoryAdded.option_images = option_images;
    categoryAdded.category_image = config.upload_folder + config.upload_entities.category_folder + categoryAdded.category_image;
    categoryAdded.award_image = config.upload_folder + config.upload_entities.category_folder + categoryAdded.award_image;
    categoryAdded.video_image = config.upload_folder + config.upload_entities.category_folder + categoryAdded.video_image;
    categoryAdded.smallicon_image = config.upload_folder + config.upload_entities.category_folder + categoryAdded.smallicon_image;
    categoryAdded.banner_image = config.upload_folder + config.upload_entities.category_folder + categoryAdded.banner_image;
    
    return categoryAdded;
}

let deleteCategory = async (id) => {
    return await CategoryModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let getAllCategoryForWebsite = async (body) => {

    let allCategory = await CategoryModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ name: 1, image: 1, category_image: 1, link:1})
        .lean()
        .exec()

    allCategory.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.category_folder + element.image;
        element.category_image = config.base_url + "/" + config.upload_folder + config.upload_entities.category_folder + element.category_image;

    });


    return allCategory;
}
module.exports = {
    addCategory,
    getAllCategory,
    updateCategory,
    deleteCategory,

    //Website
    getAllCategoryForWebsite
};