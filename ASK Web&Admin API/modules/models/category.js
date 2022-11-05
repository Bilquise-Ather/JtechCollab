'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    name: { type: String },
    award_image: { type: String },
    video_image: { type: String },
    smallicon_image: { type: String },
    banner_image: { type: String },
    displayorder: { type: Number,default: 1  },
    seotitle: { type : String },
    seodescription: { type : String },
    seokeyword: { type : String },
    category_image: { type: String },
    slug: { type: String },
    bigtext: { type: String },
    toprelatedprojects: { type: Array },
    bottomrelatedprojects: { type: Array },
    video: { type: String },
    option_images: { type: Array },
    link: { type: String },
    smalltext: { type: String },
    buttontext: { type: String },
    buttonlink: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'category' });

let VIModel = mongoose.model("category", tempSchema);
module.exports = VIModel;


