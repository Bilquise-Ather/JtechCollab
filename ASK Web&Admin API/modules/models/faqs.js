'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    quetion: { type: String },
    answer: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'faqs' });

let VIModel = mongoose.model("faqs", tempSchema);
module.exports = VIModel;



