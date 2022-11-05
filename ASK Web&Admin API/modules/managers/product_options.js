'use strict';

let _ = require("lodash"),
    config = process.config.global_config,
    ProductModel = require('../models/product'),
    ProductOptionsModal = require('../models/product_options'),
    ObjectId = require('mongoose').Types.ObjectId;


let getAllProductOptions = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
        if (body.filters) {
            if (body.filters.searchtext) {
					findData["$or"] = [
						{name: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
						{slug: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
                        {returntocollectionlink: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
                        
					]
	

            }
        }
    let getAllProductOptions = await ProductOptionsModal
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    getAllProductOptions.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.product_option_image_folder + element.image;
    });

    let totalRecords = await ProductOptionsModal.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = getAllProductOptions;
    _result.total_count = totalRecords;
    return _result;
}


let removeProductOptions = async (id) => {


    await ProductOptionsModal
        .deleteMany({ productid: ObjectId(id) })
        .lean()
        .exec();
    return await ProductOptionsModal
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}

module.exports = {
    getAllProductOptions,
    removeProductOptions
};