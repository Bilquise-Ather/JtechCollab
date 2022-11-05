'use strict';

const { forEach } = require('lodash');

let BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    ResourceOptionModel = require('../models/resource_options'),
    ResourceModel = require('../models/resource'),
    ObjectId = require('mongoose').Types.ObjectId;

let getAllResourceListForResourceOptions = async (body) => {
    return await ResourceModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ resourcename: 1 })
        .lean()
        .exec()
}
let addResourceOptions = async (req) => {
    let body = JSON.parse(req.body.body);
    let filename = "";
    let originalname = "";
    try {
        filename = req.file.filename;
        originalname = req.file.originalname;
    }
    catch (error) {
    }
    let resource_id;
    let productData = {
        resourceid: ObjectId(body.resourcename),
        title: body.title,
        seotitle: body.seotitle,
        seodescription: body.seodescription,
        seokeyword: body.seokeyword
    }
    if (body.newImageUploaded) {
        productData["pdf"] = filename,
            productData["pdfactualname"] = originalname
    }
    if (body._id) {
        //update
        resource_id = body._id;
        await ResourceOptionModel
            .updateOne({ _id: ObjectId(resource_id) }, { $set: productData })
            .exec();
    } else {
        let savedProduct = await ResourceOptionModel(productData).save();
        resource_id = savedProduct._id;
        //insert new 
    }
    productData.pdfFile = config.upload_folder + config.upload_entities.resource_pdf_folder + productData.pdfFile;
    return true;
}
let getAllResourceOptions = async (body) => {

    let findData = {};
        if (body.filters) {
            if (body.filters.searchtext) {
					findData["$or"] = [
						{resourcename: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
                        {title: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
					]
            }
        }
    let allSlider = await ResourceOptionModel.aggregate([
        { $match: findData },
        {
            $lookup: {
                from: "resource",
                let: { resource_option_id: "$resourceid" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$_id", "$$resource_option_id"] }
                        }
                    },
                    { $project: { resourcename: 1 } }
                ],
                as: "allresource"
            }
        }
    ])
        .exec()
    allSlider.forEach(x => {
        x.resourcename = x.allresource.length > 0 ? x.allresource[0].resourcename : ""
        delete x.allresource
    });

    allSlider.pdf = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_pdf_folder + allSlider.pdf;

    return allSlider;
}

let getAllResourceToEdit = async (body) => {
    let allSlider = await ResourceOptionModel
        .findOne({ _id: ObjectId(body._id) })
        .select()
        .lean()
        .exec();
    allSlider.pdf = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_pdf_folder + allSlider.pdf;
    return allSlider;
}

let deleteResourceOptions = async (id) => {
    return await ResourceOptionModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}


let getAllResourceOptionsForWebsite = async () => {

    let findData = {};
    let allSlider = await ResourceModel.aggregate([
        { $match: findData },
        { $sort: {created_at:1} },
        {
            $lookup: {
                from: "resource_options",
                let: { resource_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$resourceid", "$$resource_id"] }
                        }
                    },
                    { $project: { _id: 1, resourceid: 1, title: 1, pdf: 1, pdfactualname: 1 } }
                ],
                as: "allresource"
            }
        }
    ])
        .exec()

    
    allSlider.forEach(x => {
        x.resource_image = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_image_folder + x.resource_image;
        x.resource_logo = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_image_folder + x.resource_logo;
        x.allresource.forEach(pdflink=>{
            pdflink.pdf = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_pdf_folder + pdflink.pdf;
        })
    });


    return allSlider;
}

module.exports = {

    getAllResourceOptions,
    deleteResourceOptions,
    getAllResourceToEdit,
    getAllResourceListForResourceOptions,
    addResourceOptions,

    //Website
    getAllResourceOptionsForWebsite
};