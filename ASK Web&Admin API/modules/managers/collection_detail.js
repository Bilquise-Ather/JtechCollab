'use strict';

let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    CollectionModel = require('../models/collection'),
    ProductModel = require('../models/product'),
    ProductOptionModel = require('../models/product_options'),
    ObjectId = require('mongoose').Types.ObjectId;

    // let getAllCollectionForHome = async (body) => {

    //     let allSlider = await CollectionModel
    //         .findOne({ slug: body.slug })
    //         .sort({ created_at: -1 })
    //         .collation({ 'locale': 'en' })
    //         .select()
    //         .lean()
    //         .exec()
    //         if(!allSlider){
    //             throw new BadRequestError("Collections Not Found");
    //         }
    //     let images = [];
    
    //     allSlider.image = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + allSlider.image;
    //     allSlider.bannerimage = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + allSlider.bannerimage;
    
    //     allSlider.room_images.forEach(element1 => {
    //         images.push({ image: config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + element1 })
    //     })
    
    //     allSlider.room_images = images;
        
    //     let currentCollection = await CollectionModel.findOne({ slug: body.slug }).exec()
    //     let allProducts = await ProductModel.find({ collections: { $in: [currentCollection._id] }})
    //     allProducts = allProducts.map(a => a._id);
    //     let subProducts = await  ProductOptionModel.find({ productid: { $in: allProducts }})
    //     subProducts.forEach(element1 => {
    //         element1.image = config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element1.image;
    //         if(element1.warrantyimage)
    //             element1.warrantyimage =config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element1.warrantyimage;
    
    //         if(element1.installationimage)
    //             element1.installationimage = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + element1.installationimage;
            
    //         if(element1.maintenanaceimage)
    //             element1.maintenanaceimage = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + element1.maintenanaceimage;
    //     })
        
    //     allSlider.subproduct = subProducts;
    //     return allSlider;
    // }
let getAllCollectionForHome = async (body) => {

    let allSlider = await CollectionModel
        .findOne({ slug: body.slug })
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
        if(!allSlider){
            throw new BadRequestError("Collections Not Found");
        }
    let images = [];

    allSlider.image = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + allSlider.image;
    allSlider.bannerimage = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + allSlider.bannerimage;

    allSlider.room_images.forEach(element1 => {
        images.push({ image: config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + element1 })
    })

    allSlider.room_images = images;
    
    let currentCollection = await CollectionModel.findOne({ slug: body.slug }).exec()
    let allProducts = await ProductModel.find({ collections: { $in: [currentCollection._id] }}).sort({ created_at: -1 }).collation({ 'locale': 'en' })
    .select()
    .lean()
    .exec()
    
    allProducts.forEach(element1 => {
        element1.image = config.base_url + "/" + config.upload_folder + config.upload_entities.product_image_folder + element1.image;
    });
    
    allSlider.products = allProducts;
    console.log(allSlider.categoryview)
    if(allSlider.categoryview == "false" || !allSlider.categoryview){
       
        
    
    allProducts = allProducts.map(a => a._id);
    let subProducts = await  ProductOptionModel.find({ productid: { $in: allProducts }})
    
    subProducts.forEach(element1 => {
        element1.image = config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element1.image;
        if(element1.warrantyimage)
            element1.warrantyimage =config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element1.warrantyimage;

        if(element1.installationimage)
            element1.installationimage = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + element1.installationimage;
        
        if(element1.maintenanaceimage)
            element1.maintenanaceimage = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + element1.maintenanaceimage;
    })
    allSlider.subproduct = subProducts;

    }
    return allSlider;
}
let getSubCollectionForHome = async (body) => {
    let currentProduct  = await ProductModel
    .findOne({ slug: body.slug })
    .sort({ created_at: -1 })
    .collation({ 'locale': 'en' })
    .select()
    .lean()
    .exec()
    console.log(currentProduct);
    let allSlider = await CollectionModel
        .findOne({ _id: ObjectId(currentProduct.parentcollection) })
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
        if(!allSlider){
            throw new BadRequestError("Collections Not Found");
        }
    let images = [];
    allSlider.text = currentProduct.name;
    allSlider.videolink = currentProduct.videolink;
    
    allSlider.image = config.base_url + "/" + config.upload_folder + config.upload_entities.collection_folder + allSlider.image;
    allSlider.bannerimage = config.base_url + "/" + config.upload_folder + config.upload_entities.product_image_folder + currentProduct.image;

    currentProduct.option_images.forEach(element1 => {
        images.push({ image: config.base_url + "/" + config.upload_folder + config.upload_entities.product_image_folder + element1 })
    })

    allSlider.room_images = images;
    
   
    let subProducts = await  ProductOptionModel.find({ productid: currentProduct._id})
    subProducts.forEach(element1 => {
        element1.image = config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element1.image;
        if(element1.warrantyimage)
            element1.warrantyimage =config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element1.warrantyimage;

        if(element1.installationimage)
            element1.installationimage = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + element1.installationimage;
        
        if(element1.maintenanaceimage)
            element1.maintenanaceimage = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + element1.maintenanaceimage;
    })
    
    allSlider.subproduct = subProducts;
    return allSlider;
}


module.exports = {
    //Website
    getAllCollectionForHome,
    getSubCollectionForHome
};