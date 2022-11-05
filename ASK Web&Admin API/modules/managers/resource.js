'use strict';

let BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    ResourceModel = require('../models/resource'),
    ResourceSeoModel = require('../models/resource_seo'),
    ObjectId = require('mongoose').Types.ObjectId;

let addResource = async (req) => {
    let body = JSON.parse(req.body.body);
    let resource_id;
    //new code
    let f1;

    let resourceData = {
        resourcename: body.resourceName,
        resourcecontent: body.resourceContent,
    }
    let resourceImageFile = body.files.filter(fl => fl.type == "resource_image").length > 0 ? body.files.filter(fl => fl.type == "resource_image")[0].imageactualname : ""
    if (!resourceImageFile && !body._id) {
        throw new BadRequestError("Resource Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == resourceImageFile.toString() })[0];
        if (f1) {
            resourceData["resource_image"] = f1.filename;
        }
    }
    let resourceLogoImageFile = body.files.filter(fl => fl.type == "resource_logo").length > 0 ? body.files.filter(fl => fl.type == "resource_logo")[0].imageactualname : ""
    if (!resourceLogoImageFile && !body._id) {
        throw new BadRequestError("Resource Logo can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == resourceLogoImageFile.toString() })[0];
        if (f1) {
            resourceData["resource_logo"] = f1.filename;
        }
    }
    if (body._id) {
        //update
        await ResourceModel
            .updateOne({ _id: ObjectId(body._id) }, { $set: resourceData })
            .exec();
    } else {
        let savedResource = await ResourceModel(resourceData).save();
        resource_id = savedResource._id;
        //insert new product
    }
    return true;
}


let getAllResource = async (body) => {
    let findData = {};
        if (body.filters) {
            if (body.filters.searchtext) {
					findData["$or"] = [
						{resourcename: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
					]
            }
        }
    let allSlider = await ResourceModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec();
    allSlider.forEach(x => {
        x.resource_image = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_image_folder + x.resource_image;
        x.resource_logo = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_image_folder + x.resource_logo;
    });
 
    return allSlider;
}

let getAllResourceToEdit = async (body) => {


    let allSlider = await ResourceModel
        .findOne({ _id: ObjectId(body._id) })
        .select()
        .lean()
        .exec();


    allSlider.resource_image = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_image_folder + allSlider.resource_image;
    allSlider.resource_logo = config.base_url + "/" + config.upload_folder + config.upload_entities.resource_image_folder + allSlider.resource_logo;

    return allSlider;
}

let deleteResource = async (id) => {
    return await ResourceModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}

let addResourceSeo = async (body) => {
    let updateData = {};
    let optionalFiled = ["seotitle", "seodescription", "seokeyword"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    let isAvailable = await ResourceSeoModel
        .findOne()
        .select({ _id: 1 })
        .lean()
        .exec();
    if (!isAvailable) {
        await ResourceSeoModel(updateData).save();
    } else {
        await ResourceSeoModel
            .updateOne({ _id: ObjectId(isAvailable._id) }, { $set: updateData })
            .exec();
    }
    return true;
}
let getResourceSeo = async (body) => {
    let initialData = await ResourceSeoModel.findOne().collation({ 'locale': 'en' }).select().lean().exec()
    return initialData;
}

module.exports = {
    addResource,
    getAllResource,
    deleteResource,
    getAllResourceToEdit,
    addResourceSeo,
    getResourceSeo
};