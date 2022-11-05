'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    logo: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    instagram: { type: String },
    call: { type: String },
    email: { type: String },
    address: { type: String },
    map: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'common_settings' });

let VIModel = mongoose.model("common_settings", tempSchema);
module.exports = VIModel;



