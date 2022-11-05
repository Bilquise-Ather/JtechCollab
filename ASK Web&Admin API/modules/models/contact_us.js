'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    city: { type: String },
    state: { type: String },
    message: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'contact_us' });

let VIModel = mongoose.model("contact_us", tempSchema);
module.exports = VIModel;
