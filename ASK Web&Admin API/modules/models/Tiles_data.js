'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    description: { type: String },
    image: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    mainproduct: Schema.ObjectId,
}, { versionKey: false, collection: 'tiles_data' });

let VIModel = mongoose.model("tiles_data", tempSchema);
module.exports = VIModel;
