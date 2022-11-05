'use strict';


let _ = require("lodash"),
    config = process.config.global_config,
    BadRequestError = require('../errors/badRequestError'),
    ProductModel = require('../models/product'),
    ProductCategoryModel = require('../models/product_category'),
    ProductOptionsModal = require('../models/product_options'),
    ObjectId = require('mongoose').Types.ObjectId;


let getAllProduct = async (body) => {
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
    let allProduct = await ProductModel.aggregate([
        { $match: findData },
        { $skip: offset },
        { $limit: limit },
        {
            $lookup: {
                from: "product_category",
                let: { category_ids: "$category" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ["$_id", "$$category_ids"] }
                        }
                    },
                    { $project: { _id: 0, name: 1 } }
                ],
                as: "category"
            }
        }, {
            $lookup: {
                from: "collection",
                let: { collection_ids: "$collections" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ["$_id", "$$collection_ids"] }
                        }
                    },
                    { $project: { _id: 0, name: 1 } }
                ],
                as: "collections"
            }
        }
        , {
            $lookup: {
                from: "product_option",
                let: { master_product_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$productid", "$$master_product_id"] }
                        }
                    },
                ],
                as: "products"
            }
        }
    ])
        .exec()

    allProduct.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.product_image_folder + element.image;
    });

    let totalRecords = await ProductModel.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = allProduct;
    _result.total_count = totalRecords;
    return _result;
}

let removeProduct = async (id) => {


    await ProductOptionsModal
        .deleteMany({ productid: ObjectId(id) })
        .lean()
        .exec();
    return await ProductModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}
let getAllProductForWebsite = async (body) => {
    let limit = body.limit ? body.limit : 9,
        offset = body.page ? ((body.page - 1) * limit) : 0
        let _result = { total_count: 0 };
    let isAvailable = await ProductCategoryModel
        .findOne({ slug: body.slug })
        .select()
        .lean()
        .exec();
    if (!isAvailable) {
        throw new BadRequestError("Slug not exist");
    }

    let findData = { category: { $in: [ObjectId(isAvailable._id)] } };    
    let colorfilter = {}
    
    let thicknessfilter = {}
    let wearfilter = {}
    let sizesfilter = {}
    if (body.filters) {
        if (body.filters.collection != "all") {
            findData['collections'] = { $in: [ObjectId(body.filters.collection)] };
        }
        if (body.filters.floor != "all") {
            findData['category'] = { $in: [ObjectId(body.filters.floor)] };
        }
        if (body.filters.color != "all") {
            colorfilter = { $in: [body.filters.color, "$selectedcolor"] }
        }
        if (body.filters.thickness != "all") {
            thicknessfilter = { $in: [body.filters.thickness, "$selectedthickness"] }
        }
        if (body.filters.wear != "all") {
            wearfilter = { $in: [body.filters.wear, "$selectedwearlayer"] }
        }
        if (body.filters.sizes != "all") {
            sizesfilter = { $in: [body.filters.sizes, "$selectedsize"] }
        }
    }
    let allProduct = await ProductModel.aggregate([
        { $match: findData },
        { $skip: offset },
        { $limit: limit },
        {
            $lookup: {
                from: "product_category",
                let: { category_ids: "$category" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ["$_id", "$$category_ids"] }
                        }
                    },
                    { $project: { _id: 0, name: 1, slug: 1 } }
                ],
                as: "category"
            }
        }, {
            $lookup: {
                from: "collection",
                let: { collection_ids: "$collections" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ["$_id", "$$collection_ids"] }
                        }
                    },
                    { $project: { _id: 1, name: 1 } }
                ],
                as: "collections"
            }
        }
        , {
            $lookup: {
                from: "product_option",
                let: { master_product_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$productid", "$$master_product_id"] },
                                    colorfilter,  thicknessfilter, wearfilter,sizesfilter
                                ]
                            }
                        }

                    },
                ],
                as: "products"
            }
        }
    ]).exec()

    allProduct = allProduct.filter(ra => ra.products.length > 0);
    allProduct = allProduct.slice(offset,offset+limit);

    let allProductCount = await ProductModel.aggregate([
        { $match: findData },
        {
            $lookup: {
                from: "product_category",
                let: { category_ids: "$category" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ["$_id", "$$category_ids"] }
                        }
                    },
                    { $project: { _id: 0, name: 1, slug: 1 } }
                ],
                as: "category"
            }
        }, {
            $lookup: {
                from: "collection",
                let: { collection_ids: "$collections" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ["$_id", "$$collection_ids"] }
                        }
                    },
                    { $project: { _id: 1, name: 1 } }
                ],
                as: "collections"
            }
        }
        , {
            $lookup: {
                from: "product_option",
                let: { master_product_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$productid", "$$master_product_id"] }
                        }
                    },
                ],
                as: "products"
            }
        }
    ]).exec()
    allProductCount = allProductCount.filter(ra => ra.products.length > 0);

    allProduct.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.product_image_folder + element.image;
        element.products.forEach(element1 => {
            element1.image = config.upload_folder + config.upload_entities.product_option_image_folder + element1.image;
        });
    });





    _result = { total_count: 0 };
    _result.slides = allProduct;
    _result.colections = isAvailable.selectedCollection;
    _result.total_count = allProductCount.length;
    let allCollections = [];

    allProductCount.forEach(element1 => {
        element1.collections.forEach(collection => {
            allCollections.push({ _id: collection._id.toString(), name: collection.name.toString() });
        });
    });
    let colors = [];
    
    let thickness = [];
    let lengths = [];
    allProductCount.forEach(element1 => {
        element1.products.forEach(pr => {
            pr.selectedcolor.forEach(color => {
                colors.push(color.toString());
            });
            pr.selectedlength.forEach(ln => {
                lengths.push(ln.toString());
            });
            pr.selectedthickness.forEach(th => {
                thickness.push(th.toString());
            });
        });
    });
    colors = _.uniqBy(colors);
    thickness = _.uniqBy(thickness);
    lengths = _.uniqBy(lengths);
    
    allCollections = _.uniqBy(allCollections, '_id');
    _result.filtercollections = allCollections;
    _result.filtercolor = colors;
    _result.filterlength = lengths;    
    _result.filterthickness = thickness;
    return _result;
}

let getAllSubProductForWebsite = async (body) => {

    let getAllProductOptions = await ProductOptionsModal
        .findOne({ slug: body.slug })
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec();
        if(!getAllProductOptions){
            throw new BadRequestError("Not Found");
        }
    let getSimilarProduct = await ProductOptionsModal
        .find({ productid: ObjectId(getAllProductOptions.productid), slug: { $ne: getAllProductOptions.slug } })
        .select()
        .lean()
        .exec()
    let images = [];
    for (var x in getAllProductOptions.option_images) {
        images.push({ image: config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + getAllProductOptions.option_images[x] })
    }
    getSimilarProduct.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.product_option_image_folder + element.image;
    });
    delete getAllProductOptions.option_images
    getAllProductOptions.option_images = images;
    return { getAllProductOptions, getSimilarProduct };
}
let getAllSearchedProduct = async (body) => {
    
    let limit = body.limit ? body.limit : 9,
        offset = body.page ? ((body.page - 1) * limit) : 0
    let _result = { total_count: 0 };
   
    let allCategory = await ProductCategoryModel
    .find({})
    .sort({ created_at: -1 })
    .collation({ 'locale': 'en' })    
    .select({image:1,name:1,slug:1})
    .lean()
    .exec()
    for(var x in allCategory){        
        allCategory[x].products = await ProductModel.aggregate([
            { $match: { category : { $in: [ObjectId(allCategory[x]._id)] }}},       
            {
                $lookup: {
                    from: "product_option",
                    let: { master_product_id: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$productid", "$$master_product_id"] }
                                    ]
                                }
                            }
    
                        },{ $project: {  name: 1,image:1,slug:1 } },
                    ],
                    as: "product_option"
                }
            }
        ]).exec()
    }
    for(var x in allCategory){        
        allCategory[x].image = config.base_url + "/" +config.upload_folder + config.upload_entities.productcategory_folder + allCategory[x].image;
        allCategory[x].product_options = [];
        for(var y in allCategory[x].products){
            for(var z in allCategory[x].products[y].product_option){
                allCategory[x].products[y].product_option[z].image = config.base_url + "/" +config.upload_folder + config.upload_entities.product_option_image_folder + allCategory[x].products[y].product_option[z].image;
                allCategory[x].product_options.push(allCategory[x].products[y].product_option[z]);
            }
        }
        delete allCategory[x].products

    }
     


    

    let findData = { };
    let colorfilter = {}
    
    let thicknessfilter = {}
    let wearfilter = {}
    let sizesfilter = {}
    if (body.filters) {
        if (body.filters.collection != "all") {
            findData['collections'] = { $in: [ObjectId(body.filters.collection)] };
        }
        if (body.filters.floor != "all") {
            findData['category'] = { $in: [ObjectId(body.filters.floor)] };
        }
        if (body.filters.color != "all") {
            colorfilter = { $in: [body.filters.color, "$selectedcolor"] }
        }
        if (body.filters.thickness != "all") {
            thicknessfilter = { $in: [body.filters.thickness, "$selectedthickness"] }
        }
        if (body.filters.wear != "all") {
            wearfilter = { $in: [body.filters.wear, "$selectedwearlayer"] }
        }
        if (body.filters.sizes != "all") {
            sizesfilter = { $in: [body.filters.sizes, "$selectedsize"] }
        }
    }
    let allProduct = await ProductModel.aggregate([
        { $match: findData },
        {$sort:{name:1}},        
        {
            $lookup: {
                from: "product_option",
                let: { master_product_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $and: [
                                    { $eq: ["$productid", "$$master_product_id"] },
                                    colorfilter,  thicknessfilter, wearfilter,sizesfilter
                                ]
                            }
                        }

                    },
                ],
                as: "products"
            }
        }
    ]).exec()

   
    allProduct = allProduct.filter(ra => ra.products.length > 0);
  
    allProduct = allProduct.slice(offset,offset+limit);
    
    let allProductCount = await ProductModel.aggregate([
        { $match: findData },
        {
            $lookup: {
                from: "product_option",
                let: { master_product_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$productid", "$$master_product_id"] }
                        }
                    },
                ],
                as: "products"
            }
        }
    ]).exec()
    allProductCount = allProductCount.filter(ra => ra.products.length > 0);

    allProduct.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.product_image_folder + element.image;
        element.products.forEach(element1 => {
            element1.image = config.upload_folder + config.upload_entities.product_option_image_folder + element1.image;
        });
    });





    
    _result.category = allCategory;
    _result.slides = allProduct;
    _result.total_count = allProductCount.length;
    
    return _result;
}

module.exports = {
    getAllProduct,
    removeProduct,

    //Website
    getAllProductForWebsite,
    getAllSubProductForWebsite,
    getAllSearchedProduct
};