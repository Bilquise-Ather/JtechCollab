'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    email: { type: String },
    password: { type: String },
    fpToken: { type: String },
    fpTokenCreatedAt: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'users' });

let VIModel = mongoose.model("users", tempSchema);
module.exports = VIModel;
