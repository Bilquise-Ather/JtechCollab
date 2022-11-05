'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    seotitle: { type : String },
    seodescription: { type : String },
    seokeyword: { type : String },
    pagetitle: { type: String },    
    bannerimage: { type: String },
    description: { type: String },
    videolink: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'tiles19' });

let VIModel = mongoose.model("tiles19", tempSchema);
module.exports = VIModel;



