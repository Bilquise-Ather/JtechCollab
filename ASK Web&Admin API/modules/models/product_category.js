'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    name: { type: String },
    image: { type: String },
    slug: { type: String },
    seotitle: { type: String },
    seodescription: { type: String },
    link: { type: String },
    selectedCollection: [Schema.ObjectId],
    seokeyword: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'product_category' });

let VIModel = mongoose.model("product_category", tempSchema);
module.exports = VIModel;


