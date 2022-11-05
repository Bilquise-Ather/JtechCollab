'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    companyname: { type: String },
    companyshortdescription: { type: String },
    copyrighttext: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'footer_website_data' });

let VIModel = mongoose.model("footer_website_data", tempSchema);
module.exports = VIModel;



