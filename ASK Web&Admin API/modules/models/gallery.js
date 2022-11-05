'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    selectedCollection: Schema.ObjectId,
    name: { type: String },
    image: { type: String },
    color: { type: String },
    link: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'gallery' });

let VIModel = mongoose.model("gallery", tempSchema);
module.exports = VIModel;


