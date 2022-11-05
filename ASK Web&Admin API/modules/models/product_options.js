'use strict';
let mongoose = require("../helpers/asf_mongodb"),
    Schema = mongoose.Schema;

let tempSchema = new Schema({
    productid: Schema.ObjectId,
    name: { type: String },
    slug: { type: String },
    text: { type: String },
    packaging: { type: String },
    itemno: { type: String },
    image: { type: String },
    visualiserimage: { type: String },
    warranty: { type: String},
    installation: { type: String},
    maintenanace: { type: String},
    warrantyimage: { type: String},
    installationimage: { type: String},
    maintenanaceimage: { type: String},
    warrantyimagename: { type: String},
    installationimagename: { type: String},
    maintenanaceimagename: { type: String},

    embossedinregister: { type: String},
    option_images: { type: Array },
    selectedcolor: { type: Array },
    selectedthickness: { type: Array },    
    selectedlength: { type: Array },
    selectedmaterial: { type: Array },
    selectedsize: { type: Array },
    selectedwearlayer: { type: Array },
    selectedpad: { type: Array },
    selectedcore: { type: Array },
    seotitle: { type: String },
    seodescription: { type: String },
    seokeyword: { type: String },
    returntocollectionlink: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { versionKey: false, collection: 'product_option' });
let VIModel = mongoose.model("product_option", tempSchema);
module.exports = VIModel;


