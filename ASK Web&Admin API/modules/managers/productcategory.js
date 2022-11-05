'use strict';

let _ = require("lodash"),
    config = process.config.global_config,
    ProductCategoryModel = require('../models/product_category'),
    BadRequestError = require('../errors/badRequestError'),
    ObjectId = require('mongoose').Types.ObjectId;

let addProductCategory = async (req) => {
    if (!req.body.body) {
        throw new BadRequestError("data missing");
    }
    let isAvailable = await ProductCategoryModel
        .findOne({ slug: req.body.slug })
        .select()
        .lean()
        .exec();
    if (isAvailable && isAvailable._id != body._id) {
        throw new BadRequestError("Slug Aready Exist");
    }
    let body = JSON.parse(req.body.body);
    let filename = "";
    try {
        filename = req.file.filename;
    }
    catch (error) {

    }
    if (!filename) {
        throw new BadRequestError("Image missing");
    }

    let sliderData = {
        image: filename,
        name: body.name,
        slug: body.slug,
        seotitle: body.seotitle,
        seodescription: body.seodescription,
        seokeyword: body.seokeyword,
        link: body.link,
        seokeyword: body.selectedCollection
    }
    let productCatrgoryAdded = await ProductCategoryModel(sliderData).save();
    productCatrgoryAdded.image = config.upload_folder + config.upload_entities.productcategory_folder + productCatrgoryAdded.image;
    return productCatrgoryAdded;


}

let getAllProductCategory = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
        if (body.filters) {
            if (body.filters.searchtext) {
					findData["$or"] = [
						{name: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
						{slug: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
					]
            }
        }
    let allProductCategory = await ProductCategoryModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()
    allProductCategory.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.productcategory_folder + element.image;
    });

    let totalRecords = await ProductCategoryModel.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = allProductCategory;
    _result.total_count = totalRecords;
    return _result;
}

let updateProductCategory = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let optionalFiled = ["name", "slug", "seotitle", "seodescription", "seokeyword","link","selectedCollection"];
    let isAvailable = await ProductCategoryModel
        .findOne({ slug: body.slug })
        .select()
        .lean()
        .exec();
    if (isAvailable && isAvailable._id != body._id) {
        throw new BadRequestError("Slug Aready Exist");
    }
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }
    await ProductCategoryModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();

    let productCategoryAdded = await ProductCategoryModel
        .findOne({ _id: req.params.slider_id })
        .lean()
        .exec();
    productCategoryAdded.image = config.upload_folder + config.upload_entities.productcategory_folder + productCategoryAdded.image;
    return productCategoryAdded;
}

let deleteProductCategory = async (id) => {
    return await ProductCategoryModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let getAllProcuctCategoryForWebsite = async (body) => {

    let allSlider = await ProductCategoryModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ name: 1, image: 1, slug: 1,link:1 })
        .lean()
        .exec()
        if(!allSlider){
            throw new BadRequestError(" Category Not Found");
        }
    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.productcategory_folder + element.image;
    });


    return allSlider;
}
module.exports = {
    addProductCategory,
    getAllProductCategory,
    updateProductCategory,
    deleteProductCategory,

    //Website
    getAllProcuctCategoryForWebsite
};