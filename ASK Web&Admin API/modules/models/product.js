'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    name: { type: String },
    slug: { type: String },
    image: { type: String },
    seotitle: { type: String },
    option_images: { type: Array },
    seodescription: { type: String },
    seokeyword: { type: String },
    videolink: { type: String },
    collections: [Schema.ObjectId],
    category: [Schema.ObjectId],
    parentcollection: {type: Schema.ObjectId},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'product' });
let VIModel = mongoose.model("product", tempSchema);
module.exports = VIModel;


