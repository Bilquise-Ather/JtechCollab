'use strict';

let _ = require("lodash"),
    config = process.config.global_config,
    GalleryModel = require('../models/gallery'),
    CollectionModel = require('../models/collection'),
    BadRequestError = require('../errors/badRequestError'),
    ObjectId = require('mongoose').Types.ObjectId;

let addGallery = async (req) => {
    if (!req.body.body) {
        throw new BadRequestError("data missing");
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
        link: body.link,
        color: body.color,
        selectedCollection: body.selectedCollection
    }

    let GalleryAdded = await GalleryModel(sliderData).save();
    GalleryAdded.image = config.upload_folder + config.upload_entities.productcategory_folder + GalleryAdded.image;
    let collection = await CollectionModel
        .findOne({ _id: ObjectId(body.selectedCollection) })
        .select({ _id: 1, name: 1, image: 1 })
        .lean()
        .exec();

    GalleryAdded.collectionimage = config.upload_folder + config.upload_entities.collection_folder + collection.image;
    GalleryAdded.collectionname = collection.name;
    return GalleryAdded;


}

let getAllGallery = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
    if (body.filters) {
        if (body.filters.searchtext) {
            findData["$or"] = [
                { name: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
                { color: { $regex: new RegExp(body.filters.searchtext, 'ig') } },
            ]
        }
    }
    let allGallery = await GalleryModel.aggregate([
        { $match: findData },
        { $skip: offset },
        { $limit: limit },
        {
            $lookup: {
                from: "collection",
                let: { collection_ids: "$selectedCollection" },
                pipeline: [
                    {
                        $match: {

                            $expr: { $eq: ["$_id", "$$collection_ids"] }
                        }
                    },
                    { $project: { _id: 0, name: 1, image: 1 } }
                ],
                as: "collections"
            }
        }

    ])
        .exec()

    allGallery.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.productcategory_folder + element.image;
        element.collectionimage = config.upload_folder + config.upload_entities.collection_folder + element.collections[0].image;
        element.collectionname = element.collections[0].name;
        delete element.collections
    });

    let totalRecords = await GalleryModel.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = allGallery;
    _result.total_count = totalRecords;
    return _result;
}

let updateGallery = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let optionalFiled = ["name", "color",  "selectedCollection"];

    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });
    updateData["link"] = body.link;
    
    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }
    await GalleryModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();

    let GalleryAdded = await GalleryModel
        .findOne({ _id: req.params.slider_id })
        .lean()
        .exec();
    let collection = await CollectionModel
        .findOne({ _id: ObjectId(GalleryAdded.selectedCollection) })
        .select({ _id: 1, name: 1, image: 1 })
        .lean()
        .exec();

    GalleryAdded.collectionimage = config.upload_folder + config.upload_entities.collection_folder + collection.image;
    GalleryAdded.collectionname = collection.name;

    GalleryAdded.image = config.upload_folder + config.upload_entities.productcategory_folder + GalleryAdded.image;
    return GalleryAdded;
}

let deleteGallery = async (id) => {
    return await GalleryModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let getAllGalleryForWebsite = async (body) => {

    let allGallery = await GalleryModel.aggregate([
        { $sort: {link:-1} },
        {
            $lookup: {
                from: "collection",
                let: { collection_ids: "$selectedCollection" },
                pipeline: [
                    {
                        $match: {

                            $expr: { $eq: ["$_id", "$$collection_ids"] }
                        }
                    },
                    { $project: { _id: 0, name: 1, image: 1,slug:1 } }
                ],
                as: "collections"
            }
        }

    ])
        .exec()

    allGallery.forEach(element => {
        element.image = config.base_url + "/" +config.upload_folder + config.upload_entities.productcategory_folder + element.image;
        element.collectionimage = config.base_url + "/" +config.upload_folder + config.upload_entities.collection_folder + element.collections[0].image;
        element.collectionname = element.collections[0].name;
        element.collectionslug = element.collections[0].slug;
        delete element.collections
    });



    return allGallery;

}
module.exports = {
    addGallery,
    getAllGallery,
    updateGallery,
    deleteGallery,

    //Website
    getAllGalleryForWebsite
};