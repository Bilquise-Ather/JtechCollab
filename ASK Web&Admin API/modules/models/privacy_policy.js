'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    pagetitle: { type: String },
    description: { type: String },
    seotitle: { type: String },
    seodescription: { type: String },
    seokeyword: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'privacy_policy' });

let VIModel = mongoose.model("privacy_policy", tempSchema);
module.exports = VIModel;



