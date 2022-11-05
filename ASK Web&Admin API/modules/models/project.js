'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    categoryid: Schema.ObjectId,
    name: { type: String },
    slug: { type: String },
    title: { type: String },
    video: { type: String },
    honored: { type: String },
    image: { type: String },
    baseimage: { type: String },    
    video_image: { type: String },    
    projectdetails: { type: String},
    aboutproject: { type: String},
    buttontext: { type: String},
    buttonlink: { type: String},
    option_images: { type: Array },   
    seotitle: { type: String },
    seodescription: { type: String },
    relatedprojects: { type: Array },
    seokeyword: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'projects' });
let VIModel = mongoose.model("projects", tempSchema);
module.exports = VIModel;


