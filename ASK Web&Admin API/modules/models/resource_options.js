'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    resourceid: Schema.ObjectId,
    title: { type: String },
    pdf: { type: String },
    pdfactualname: { type: String },
    seotitle: { type: String },
    seodescription: { type: String },
    seokeyword: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'resource_options' });
let VIModel = mongoose.model("resource_options", tempSchema);
module.exports = VIModel;


