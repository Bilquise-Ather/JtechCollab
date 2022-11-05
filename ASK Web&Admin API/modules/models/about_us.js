'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    seotitle: { type : String },
    seodescription: { type : String },
    seokeyword: { type : String },
    pagetitle: { type: String },
    subtitle: { type: String },
    content: { type: String },
    bannerimage: { type: String },
    introtitle: { type: String },
    introimage: { type: String },
    introcontent: { type: String },
    countericon1: { type: String },
    countertitle1: { type: String },
    counternumber1: { type: Number },
    countericon2: { type: String },
    countertitle2: { type: String },
    counternumber2: { type: Number },
    countericon3: { type: String },
    countertitle3: { type: String },
    counternumber3: { type: Number },
    countericon4: { type: String },
    countertitle4: { type: String },
    counternumber4: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'about_us' });

let VIModel = mongoose.model("about_us", tempSchema);
module.exports = VIModel;



