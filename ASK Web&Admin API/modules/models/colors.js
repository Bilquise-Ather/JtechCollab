'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({        
        name: { type : String },          
        created_at : { type : Date,  default: Date.now},
        updated_at : { type : Date, default: Date.now}        
    },{ versionKey: false,collection: 'colors' });
let VIModel = mongoose.model("colors", tempSchema);    
module.exports = VIModel;
    

