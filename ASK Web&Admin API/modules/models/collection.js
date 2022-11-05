'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    name: { type: String },
    slug: { type: String },
    text: { type: String },
    image: { type: String },
    bannerimage: { type: String },
    seotitle: { type: String },
    seodescription: { type: String },
    seokeyword: { type: String },
    link: { type: String },
    videolink: { type: String },
    categoryview: { type: String },    
    showinvisualiser: { type: Boolean,default:false },        
    room_images: { type: Array },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'collection' });

let VIModel = mongoose.model("collection", tempSchema);
module.exports = VIModel;


