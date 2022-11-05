'use strict';

let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    CollectionModel = require('../models/collection'),
    ProductCategoryModel = require('../models/product_category'),
    ObjectId = require('mongoose').Types.ObjectId;

let addCollection = async (req) => {
    let body = JSON.parse(req.body.body);

    let collection_id;
    let f1;
    let isAvailable = await CollectionModel
        .findOne({ slug: body.slug })
        .select()
        .lean()
        .exec();
    if (isAvailable && isAvailable._id != body._id) {
        throw new BadRequestError("Slug Aready Exist");
    }

    let collectionData = {
        name: body.name,
        slug: body.slug,
        text: body.text,
        seotitle: body.seotitle,
        seodescription: body.seodescription,
        seokeyword: body.seokeyword,
        link: body.link,
        videolink: body.videolink,
        categoryview: body.categoryview,
        showinvisualiser: body.showinvisualiser,

    }

    let collectionImage = body.uploaded_files.filter(fl => fl.type == "collectionimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "collectionimage")[0].imageactualname : ""
    if (!collectionImage && !body._id) {
        throw new BadRequestError("Collection Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == collectionImage.toString() })[0];
        if (f1) {
            collectionData["image"] = f1.filename;
        }
    }
    let collectionbannerImage = body.uploaded_files.filter(fl => fl.type == "collectionbannerimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "collectionbannerimage")[0].imageactualname : ""
    if (!collectionbannerImage && !body._id) {
        throw new BadRequestError("Collection Banner Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == collectionbannerImage.toString() })[0];
        if (f1) {
            collectionData["bannerimage"] = f1.filename;
        }
    }

    let room_images = []
    let roomimages = body.uploaded_files.filter(fl => fl.type == "roomimage")
    for (const i in roomimages) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == roomimages[i].imageactualname.toString() })[0];
        f1 ? room_images.push(f1.filename) : ""
    }

    collectionData["room_images"] = room_images;
    collectionData["room_images"] = collectionData["room_images"].concat(body.remaining_url)


    if (body._id) {
        //update
        collection_id = body._id;
        await CollectionModel
            .updateOne({ _id: ObjectId(collection_id) }, { $set: collectionData })
            .exec();
    } else {
        let savedProduct = await CollectionModel(collectionData).save();
        collection_id = savedProduct._id;

    }
    return true;


}

let getAllCollection = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
        if (body.filters) {
            if (body.filters.searchtext) {
					findData["$or"] = [
						{name: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
					]
            }
        }
    let allCollection = await CollectionModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()
    allCollection.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.collection_folder + element.image;
    });

    let totalRecords = await CollectionModel.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = allCollection;
    _result.total_count = totalRecords;
    return _result;
}

let updateCollection = async (req) => {
    let body = JSON.parse(req.body.body);
    let updateData = {};
    let optionalFiled = ["name"];
    optionalFiled.forEach(x => {
        if (body[x]) {
            updateData[x] = body[x];
        }
    });

    if (req.file && req.file.path) {
        updateData["image"] = req.file.filename;
    }

    await CollectionModel
        .updateOne({ _id: ObjectId(req.params.slider_id) }, { $set: updateData })
        .exec();

    let collectionAdded = await CollectionModel
        .findOne({ _id: ObjectId(req.params.slider_id) })
        .lean()
        .exec();
    collectionAdded.image = config.upload_folder + config.upload_entities.collection_folder + collectionAdded.image;
    return collectionAdded;
}

let deleteCollection = async (id) => {
    return await CollectionModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let getAllCollectionForHome = async (body) => {

    let allSlider = await CollectionModel
        .find()
        .sort({ name: 1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()

    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + element.image;
    });


    return allSlider;
}
let getAllCollectionForVisualiser = async (body) => {

    let allSlider = await CollectionModel
        .find({showinvisualiser:true})
        .sort({ name: 1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()

    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + element.image;
    });


    return allSlider;
}

let getSingleCollection = async (body) => {

    let collectionData = await CollectionModel
        .findOne({ _id: body._id })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()

    collectionData.image = config.upload_folder + config.upload_entities.collection_folder + collectionData.image;
    collectionData.bannerimage = config.upload_folder + config.upload_entities.collection_folder + collectionData.bannerimage;
    let images = []
    if (collectionData.room_images && collectionData.room_images.length > 0) {
        collectionData.room_images.forEach(element => {
            images.push({ image: config.upload_folder + config.upload_entities.collection_folder + element, baseimage: element })

        });
    }
    collectionData.room_images = images;

    return collectionData;
}


let getAllCollectionWithFilter = async (body) => {
    
    let isAvailable = await ProductCategoryModel
    .findOne({ slug: body.slug })
    .select()
    .lean()
    .exec();
    let allSlider = await CollectionModel
        .find({ _id: { $in: isAvailable.selectedCollection } })
        .sort({ name: 1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()

    allSlider.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + element.image;
    });


    return allSlider;
}
module.exports = {
    addCollection,
    getAllCollection,
    updateCollection,
    deleteCollection,
    getSingleCollection,
    //Website
    getAllCollectionForHome,
    getAllCollectionForVisualiser,
    getAllCollectionWithFilter
};