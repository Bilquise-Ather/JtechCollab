'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    label: { type: String },
    pathdata: { type: String },
    room_id: { type: Schema.ObjectId },
    image: { type: String },
    collections: [Schema.ObjectId],
    productoption_id: { type: Schema.ObjectId },    
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'rooms_path' });

let VIModel = mongoose.model("rooms_path", tempSchema);
module.exports = VIModel;
