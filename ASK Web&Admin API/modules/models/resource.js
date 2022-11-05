'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    resourcename: { type: String },
    resource_image: { type: String },
    resource_logo: { type: String },
    resourcecontent: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'resource' });
let VIModel = mongoose.model("resource", tempSchema);
module.exports = VIModel;


