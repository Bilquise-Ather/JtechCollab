'use strict';

let _ = require("lodash"),
    BadRequestError = require('../errors/badRequestError'),
    config = process.config.global_config,
    ColorModal = require('../models/colors'),
    ThicknessModal = require('../models/thickness'),
    LengthModal = require('../models/length'),
    MaterialModal = require('../models/material'),
    ProductModal = require('../models/product'),
    ProductCategoryModal = require('../models/product_category'),
    SizeModal = require('../models/size'),
    WearLayerModal = require('../models/wear_layer'),
    PadModal = require('../models/pad'),
    CoreModal = require('../models/core'),
    PrivacyPolicyModal = require('../models/privacy_policy'),
    TermsConditionModal = require('../models/terms_condition'),
    ProductOptionsModal = require('../models/product_options'),
    CollectionModal = require('../models/collection'),
    ContactUsSEOModel = require('../models/contact_us_seo'),
    AboutUsModel = require('../models/about_us'),
    FaqsSEOModal = require('../models/faqs_seo'),
    VisualiserSeoModal = require('../models/visualiser_seo'),
    ResourceSeoModel = require('../models/resource_seo'),
    GallerySeoModel = require('../models/gallery_seo'),
    ProjectSeoModel = require('../models/projects_seo'),
    SearchSeoModel = require('../models/search_seo'),
    CategoryModel = require('../models/category'),
    HomeSEOModel = require('../models/home_seo'),
    DIYSeoModal = require('../models/DIY_seo'),
    Tiles19Model = require('../models/Tiles19'),
    Tiles24Model = require('../models/Tiles24'),
    ProjectModel = require('../models/project'),
    TilesDataModel = require('../models/Tiles_data'),
    ObjectId = require('mongoose').Types.ObjectId;

let addColor = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await ColorModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await ColorModal({ name: body.text }).save();
}
let getAllColor = async (body) => {
    return await ColorModal
        .find()
        .sort({ name:1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}
let addThickness = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await ThicknessModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await ThicknessModal({ name: body.text }).save();
}
let getAllThickness = async (body) => {
    return await ThicknessModal
        .find()
        .sort({ created_at: 1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}


let addLength = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await LengthModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await LengthModal({ name: body.text }).save();
}
let getAllSize = async (body) => {
    return await SizeModal
        .find()
        .sort({ updated_at: 1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}
let getAllFloor = async (body) => {
    return await ProductCategoryModal
        .find()
        .sort({ updated_at: 1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}
let getAllWear = async (body) => {
    return await WearLayerModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' }) 
        .select()
        .lean()
        .exec()
}
let getAllLength = async (body) => {
    return await LengthModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' }) 
        .select()
        .lean()
        .exec()
}

let addMaterial = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await MaterialModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await MaterialModal({ name: body.text }).save();
}
let getAllMaterial = async (body) => {
    return await MaterialModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}

let getProduct = async (body) => {

    let findData = { _id: ObjectId(body._id) };
    
    let allProduct = await ProductModal.aggregate([
        { $match: findData },
        {
            $lookup: {
                from: "product_option",
                let: { product_id: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ["$productid", "$$product_id"] }
                        }
                    },
                    { $project: { name: 1, selectedcolor: 1, selectedthickness: 1, selectedlength: 1, selectedmaterial: 1, image: 1} }
                ],
                as: "colors"
            }
        }
    ])
        .exec()

    allProduct.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.product_image_folder + element.image;
    });

    let option_images = []
    
    if( allProduct[0].option_images && allProduct[0].option_images.length > 0){
    allProduct[0].option_images.forEach(element => {
        option_images.push({ image: config.upload_folder + config.upload_entities.product_image_folder + element, baseimage: element })
    });
}
    allProduct[0].option_images = option_images;
    allProduct[0].colors.forEach(element => {
        element.image = config.upload_folder + config.upload_entities.product_image_folder + element.image;
    });


    return allProduct[0];
}

let getAllProductCategory = async (body) => {
    return await ProductCategoryModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ name: 1 })
        .lean()
        .exec()
}
let getAllProductSize = async (body) => {
    return await SizeModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ name: 1 })
        .lean()
        .exec()
}

let addSize = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await SizeModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await SizeModal({ name: body.text }).save();
}

let getAllWearLayer = async (body) => {
    return await WearLayerModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}
let addWearLayer = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await WearLayerModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await WearLayerModal({ name: body.text }).save();
}
let getAllPad = async (body) => {
    return await PadModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}
let addPad = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await PadModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await PadModal({ name: body.text }).save();
}
let getAllCore = async (body) => {
    return await CoreModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select()
        .lean()
        .exec()
}
let addCore = async (body) => {
    if (!body) {
        throw new BadRequestError('Data can not empty');
    }
    let isAvailable = await CoreModal
        .findOne({ name: body.text })
        .select()
        .lean()
        .exec();
    if (isAvailable) {
        return isAvailable;
    }
    return await CoreModal({ name: body.text }).save();
}

let getAllProductListForSubProduct = async (body) => {
    return await ProductModal
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ name: 1, email: 1, address: 1 })
        .lean()
        .exec()
}
let getAllProjectCategoryList = async (body) => {
    return await CategoryModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ name: 1 })
        .lean()
        .exec()
}
let getAllProjectList = async (body) => {
    return await ProjectModel
        .find()
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .select({ name: 1 })
        .lean()
        .exec()
}
let addProduct = async (req) => {
    let body = JSON.parse(req.body.body);
    let product_id;
    //new code
    let f1;

    let isAvailable = await ProductModal
        .findOne({ slug: body.slug })
        .select()
        .lean()
        .exec();
    if (isAvailable && isAvailable._id != body._id) {
        throw new BadRequestError("Slug Aready Exist");
    }
    let productData = {
        name: body.name,
        slug: body.slug,
        collections: Array.isArray(body.collections) ? body.collections : [],
        category: Array.isArray(body.category) ? body.category : [],
        seotitle: body.seotitle,
        parentcollection: body.parentcollection,
        seodescription: body.seodescription,
        seokeyword: body.seokeyword,
        videolink: body.videolink
    }
    
    let productImage = body.uploaded_files.filter(fl => fl.type == "product").length > 0 ? body.uploaded_files.filter(fl => fl.type == "product")[0].imageactualname : ""
    if (!productImage && !body._id) {
        throw new BadRequestError("Product Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productImage.toString() })[0];
        if (f1) {
            productData["image"] = f1.filename;
        }
    }

    let option_images = []
    let productOptionImages = body.uploaded_files.filter(fl => fl.type == "productoption")
    for (const i in productOptionImages) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productOptionImages[i].imageactualname.toString() })[0];
        f1 ? option_images.push(f1.filename) : ""
    }

    productData["option_images"] = option_images;
    productData["option_images"] = productData["option_images"].concat(body.remaining_url)
console.log(productData);
    if (body._id) {
        //update
        product_id = body._id;
        await ProductModal
            .updateOne({ _id: ObjectId(product_id) }, { $set: productData })
            .exec();
    } else {
        let savedProduct = await ProductModal(productData).save();
        product_id = savedProduct._id;
        //insert new product
    }
    return true;
}
let duplicateSubProduct = async (req) => {
    let body = req.body;
    
    let isAvailable = await ProductOptionsModal
    .findOne({ _id:ObjectId(body._id)  })
    .select()
    .lean()
    .exec();
    delete isAvailable._id;    
    delete isAvailable.created_at;    
    delete isAvailable.updated_at;    
    isAvailable.slug  = isAvailable.slug + "-" + Date.now();   
    let savedProduct = await ProductOptionsModal(isAvailable).save();    
    return true;

}
let addSubProduct = async (req) => {
    let body = JSON.parse(req.body.body);
    let product_id;

    let f1;
   
    let isAvailable = await ProductOptionsModal
        .findOne({ slug: body.slug })
        .select()
        .lean()
        .exec();
    if (isAvailable && isAvailable._id != body._id) {
        throw new BadRequestError("Slug Aready Exist");
    }
    let productData = {
        productid: ObjectId(body.parentproduct),
        name: body.name,
        slug: body.slug,
        text: body.text,
        warranty: body.warranty,
        installation: body.installation,
        maintenanace: body.maintenanace,
        embossedinregister: body.embossedinregister,
        packaging: body.packaging,
        itemno: body.itemno,
        seotitle: body.seotitle,
        seodescription: body.seodescription,
        seokeyword: body.seokeyword,
        returntocollectionlink: body.returntocollectionlink,
        selectedsize: Array.isArray(body.selectedsize) ? body.selectedsize : [],
        selectedcolor: Array.isArray(body.selectedcolor) ? body.selectedcolor : [],
        selectedmaterial: Array.isArray(body.selectedmaterial) ? body.selectedmaterial : [],
        selectedthickness: Array.isArray(body.selectedthickness) ? body.selectedthickness : [],
        selectedlength: Array.isArray(body.selectedlength) ? body.selectedlength : [],
        selectedwearlayer: Array.isArray(body.selectedwearlayer) ? body.selectedwearlayer : [],
        selectedpad: Array.isArray(body.selectedpad) ? body.selectedpad : [],
        selectedcore: Array.isArray(body.selectedcore) ? body.selectedcore : [],
    }

    let productImage = body.uploaded_files.filter(fl => fl.type == "product").length > 0 ? body.uploaded_files.filter(fl => fl.type == "product")[0].imageactualname : ""
    if (!productImage && !body._id) {
        throw new BadRequestError("Product Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productImage.toString() })[0];
        if (f1) {
            productData["image"] = f1.filename;
        }
    }

    let productVisualiserImage = body.uploaded_files.filter(fl => fl.type == "productvisualiser").length > 0 ? body.uploaded_files.filter(fl => fl.type == "productvisualiser")[0].imageactualname : ""
    

    if (!productVisualiserImage && !body._id) {
        throw new BadRequestError("Product Visualiser Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productVisualiserImage.toString() })[0];        
        if (f1) {
            productData["visualiserimage"] = f1.filename;
        }
    }
    

    let warrantyimage = body.uploaded_files.filter(fl => fl.type == "warrantyimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "warrantyimage")[0].imageactualname : ""
    if (!warrantyimage && !body._id) {
        
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == warrantyimage.toString() })[0];
        if (f1) {
            productData["warrantyimage"] = f1.filename;
            productData["warrantyimagename"] = f1.originalname;
        }
    }
    let installationimage = body.uploaded_files.filter(fl => fl.type == "installationimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "installationimage")[0].imageactualname : ""
    if (!productImage && !body._id) {
        
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == installationimage.toString() })[0];
        if (f1) {
            productData["installationimage"] = f1.filename;
            productData["installationimagename"] = f1.originalname;
        }
    }
    let maintenanaceimage = body.uploaded_files.filter(fl => fl.type == "maintenanaceimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "maintenanaceimage")[0].imageactualname : ""
    if (!maintenanaceimage && !body._id) {
        
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == maintenanaceimage.toString() })[0];
        if (f1) {
            productData["maintenanaceimage"] = f1.filename;
            productData["maintenanaceimagename"] = f1.originalname;
        }
    }
  
    let option_images = []
    let productOptionImages = body.uploaded_files.filter(fl => fl.type == "productoption")
    for (const i in productOptionImages) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productOptionImages[i].imageactualname.toString() })[0];
        f1 ? option_images.push(f1.filename) : ""
    }

    productData["option_images"] = option_images;
    productData["option_images"] = productData["option_images"].concat(body.remaining_url)
   
    let unset = {};
    if(body.installationdelete){
        unset.installationimage = 1;
        unset.installationimagename = 1
    }
    if(body.warrantydelete){
        unset.warrantyimage = 1;
        unset.warrantyimagename = 1
    }
    if(body.maintenanacedelete){
        unset.maintenanaceimagename = 1;
        unset.maintenanaceimage = 1
    }
    if (body._id) {
        //update
        product_id = body._id;
        await ProductOptionsModal
            .updateOne({ _id: ObjectId(product_id) }, { $set: productData,$unset:unset})
            .exec();
    } else {
        let savedProduct = await ProductOptionsModal(productData).save();
        product_id = savedProduct._id;

    }
    return true;
}
let getSubProduct = async (body) => {


    let product = await ProductOptionsModal
        .findOne({ _id: ObjectId(body._id) })
        .select()
        .lean()
        .exec();

    product.image = config.upload_folder + config.upload_entities.product_option_image_folder + product.image;
    product.visualiserimage = config.upload_folder + config.upload_entities.product_option_image_folder + product.visualiserimage;
    if(product.warrantyimage)
        product.warrantyimage = config.upload_folder + config.upload_entities.product_option_image_folder + product.warrantyimage;
    
    if(product.installationimage)
        product.installationimage = config.upload_folder + config.upload_entities.product_option_image_folder + product.installationimage;
    
    if(product.maintenanaceimage)
        product.maintenanaceimage = config.upload_folder + config.upload_entities.product_option_image_folder + product.maintenanaceimage;
    
    let option_images = []
    product.option_images.forEach(element => {
        option_images.push({ image: config.upload_folder + config.upload_entities.product_option_image_folder + element, baseimage: element })
    });
    product.option_images = option_images;
    return product;
}

let getSEODetails = async (body) => {
    if (!body) {
        throw new BadRequestError("Not Available");
    }
    let SEO;
    if (body.page == "home") {
        SEO = await HomeSEOModel
            .findOne({})
            .select()
            .lean()
            .exec();

    } else if (body.page == "productcategory") {

        SEO = await ProductCategoryModal
            .findOne({ slug: body.slug })
            .select({ seotitle: 1, seokeyword: 1, seodescription: 1 })
            .lean()
            .exec();

    }
    else if (body.page == "sub-product") {
        SEO = await ProductOptionsModal
            .findOne({ slug: body.slug })
            .select({ seotitle: 1, seokeyword: 1, seodescription: 1 })
            .lean()
            .exec();
    }
    else if (body.page == "Collection Detail") {

        SEO = await CollectionModal
            .findOne({ slug: body.slug })
            .select({ seotitle: 1, seokeyword: 1, seodescription: 1 })
            .lean()
            .exec();
    }
    if (body.page == "Contact Us") {
        SEO = await ContactUsSEOModel
            .findOne({})
            .select()
            .lean()
            .exec();
    }
    if (body.page == "About Us") {
        SEO = await AboutUsModel
            .findOne({})
            .select({ seotitle: 1, seokeyword: 1, seodescription: 1 })
            .lean()
            .exec();
    }
    if (body.page == "Terms Conditions") {
        SEO = await TermsConditionModal
            .findOne({})
            .select({ seotitle: 1, seokeyword: 1, seodescription: 1 })
            .lean()
            .exec();
    }
    if (body.page == "Privacy Policy") {
        SEO = await PrivacyPolicyModal
            .findOne({})
            .select({ seotitle: 1, seokeyword: 1, seodescription: 1 })
            .lean()
            .exec();
    }
    if (body.page == "FAQS") {
        SEO = await FaqsSEOModal
            .findOne({})
            .select()
            .lean()
            .exec();
    }
    if (body.page == "Resource") {
        SEO = await ResourceSeoModel
            .findOne({})
            .select({ seotitle: 1, seokeyword: 1, seodescription: 1 })
            .lean()
            .exec();
    }
    if (body.page == "DIY") {
        SEO = await DIYSeoModal
            .findOne({})
            .select()
            .lean()
            .exec();
    }
    if (body.page == "19x19") {
        SEO = await Tiles19Model
            .findOne({})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }
    if (body.page == "24x24") {
        SEO = await Tiles24Model
            .findOne({})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }
    if (body.page == "search") {
        SEO = await SearchSeoModel
            .findOne({})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }

    if (body.page == "project") {
        SEO = await ProjectSeoModel
            .findOne({})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();            
    }
    
    if (body.page == "projectview") {
        SEO = await CategoryModel
            .findOne({slug:body.slug})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }
    if (body.page == "projectdetail") {
        SEO = await ProjectModel
            .findOne({slug:body.slug})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }
    
    if (body.page == "gallery") {
        SEO = await GallerySeoModel
            .findOne({})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }

    if (body.page == "subcollection") {
        SEO = await ProductModal
            .findOne({slug:body.slug})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }
    if (body.page == "visualiser") {
        SEO = await VisualiserSeoModal
            .findOne({slug:body.slug})
            .select({seotitle:1,seokeyword:1,seodescription:1})
            .lean()
            .exec();
    }
   
    return SEO;
}

let addProject = async (req) => {
    let body = JSON.parse(req.body.body);
    let product_id;

    let f1;    
    let isAvailable = await ProjectModel
        .findOne({ slug: body.slug })
        .select()
        .lean()
        .exec();
    if (isAvailable && isAvailable._id != body._id) {
        throw new BadRequestError("Slug Aready Exist");
    }
    let productData = {
        categoryid: ObjectId(body.categoryid),
        name: body.name,
        slug: body.slug,
        title: body.title,
        video: body.video,
        honored: body.honored,
        projectdetails: body.projectdetails,
        aboutproject: body.aboutproject,
        buttontext: body.buttontext,
        buttonlink: body.buttonlink,
        seotitle: body.seotitle,
        relatedprojects: body.relatedprojects,
        seodescription: body.seodescription,
        seokeyword: body.seokeyword,       
    }
    if(body.award_image == "" && body._id){
        productData["image"] = "";
    }
    let productImage = body.uploaded_files.filter(fl => fl.type == "product").length > 0 ? body.uploaded_files.filter(fl => fl.type == "product")[0].imageactualname : ""
    if (!productImage && !body._id) {
        throw new BadRequestError("Project Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productImage.toString() })[0];
        if (f1) {
            productData["image"] = f1.filename;
        }
    }
   
    let productVideoImage = body.uploaded_files.filter(fl => fl.type == "product_video").length > 0 ? body.uploaded_files.filter(fl => fl.type == "product_video")[0].imageactualname : ""

    if(body.video_image == "" && body._id){
        productData["video_image"] = "";
    }
    if (productVideoImage){
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productVideoImage.toString() })[0];
        if (f1) {
            productData["video_image"] = f1.filename;
        }
    }
  
  

    let productBaseImage = body.uploaded_files.filter(fl => fl.type == "productbaseimage").length > 0 ? body.uploaded_files.filter(fl => fl.type == "productbaseimage")[0].imageactualname : ""
    if (!productBaseImage && !body._id) {
        throw new BadRequestError("Base Image can not be blank");
    } else {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productBaseImage.toString() })[0];
        if (f1) {
            productData["baseimage"] = f1.filename;
        }
    }

    
    let option_images = []
    let productOptionImages = body.uploaded_files.filter(fl => fl.type == "productoption")
    for (const i in productOptionImages) {
        f1 = req.files.filter(fl => { return fl.originalname.toString() == productOptionImages[i].imageactualname.toString() })[0];
        f1 ? option_images.push(f1.filename) : ""
    }

    productData["option_images"] = option_images;
    productData["option_images"] = productData["option_images"].concat(body.remaining_url)


    if (body._id) {
        //update
        product_id = body._id;
        await ProjectModel
            .updateOne({ _id: ObjectId(product_id) }, { $set: productData })
            .exec();
    } else {
        let savedProduct = await ProjectModel(productData).save();
        product_id = savedProduct._id;

    }
    return true;
}



let getAllProjects = async (body) => {
    let limit = body.limit ? body.limit : 20,
        offset = body.page ? ((body.page - 1) * limit) : 0,
        findData = {};
        if (body.filters) {
            if (body.filters.searchtext) {
					findData["$or"] = [
						{name: {$regex: new RegExp(body.filters.searchtext, 'ig')}},
						{slug: {$regex: new RegExp(body.filters.searchtext, 'ig')}}
					]
	

            }
        }
    let getAllProductOptions = await ProjectModel
        .find(findData)
        .sort({ created_at: -1 })
        .collation({ 'locale': 'en' })
        .skip(offset)
        .limit(limit)
        .select()
        .lean()
        .exec()

    getAllProductOptions.forEach(element => {
        element.baseimage = config.upload_folder + config.upload_entities.product_option_image_folder + element.baseimage;
    });

    let totalRecords = await ProjectModel.countDocuments(findData);

    let _result = { total_count: 0 };
    _result.slides = getAllProductOptions;
    _result.total_count = totalRecords;
    return _result;
}


let removeProjects = async (id) => {   
    console.log(id)
    return await ProjectModel
        .deleteOne({ _id: ObjectId(id) })
        .lean()
        .exec();
}

let getProjectDetail = async (body) => {


    let product = await ProjectModel
        .findOne({ _id: ObjectId(body._id) })
        .select()
        .lean()
        .exec();
        if(product.image){
            product.image = config.upload_folder + config.upload_entities.product_option_image_folder + product.image;
        }
    
    product.baseimage = config.upload_folder + config.upload_entities.product_option_image_folder + product.baseimage;
    if(product.video_image){
    product.video_image = config.upload_folder + config.upload_entities.product_option_image_folder + product.video_image;
}
    let option_images = []
    product.option_images.forEach(element => {
        option_images.push({ image: config.upload_folder + config.upload_entities.product_option_image_folder + element, baseimage: element })
    });
    product.option_images = option_images;
    return product;
}
let getProjectMiniDetailForWebsite = async (body) => {
    let projectMiniDetail = await CategoryModel
    .findOne({ slug: body.slug })
        .select()
        .lean()
        .exec();
    
    
    
  
  
    if(projectMiniDetail.award_image){
        projectMiniDetail.award_image = config.upload_folder + config.upload_entities.category_folder + projectMiniDetail.award_image;
    }
    if(projectMiniDetail.video_image){
        projectMiniDetail.video_image = config.upload_folder + config.upload_entities.category_folder + projectMiniDetail.video_image;
    }
    if(projectMiniDetail.option_images){
        let images = [];
        projectMiniDetail.option_images.forEach(element => {
            images.push({image:element = config.upload_folder + config.upload_entities.category_folder + element})    
        });
        projectMiniDetail.option_images = images
        
    }
    let relatedProject = await ProjectModel
        .find({_id : { $in:projectMiniDetail.toprelatedprojects}})
        .select({name: 1 ,baseimage: 1,slug:1})
        .lean()
        .exec();
    

    if(relatedProject.length > 0){
        relatedProject.forEach(element => {
            element.baseimage = config.upload_folder + config.upload_entities.product_option_image_folder + element.baseimage;
        });
    }
    let bottomrelatedProject = await ProjectModel
    .find({_id : { $in:projectMiniDetail.bottomrelatedprojects}})
    .select({name: 1 ,baseimage: 1,slug:1})
    .lean()
    .exec();


if(bottomrelatedProject.length > 0){
    bottomrelatedProject.forEach(element => {
        element.baseimage = config.upload_folder + config.upload_entities.product_option_image_folder + element.baseimage;
    });
}
    projectMiniDetail.relatedProjectsDetail =  relatedProject;
    projectMiniDetail.bottomrelatedProject =  bottomrelatedProject;
    
    return projectMiniDetail;
}

let getProjectFullDetailForWebsite = async (body) => {
  let product = await ProjectModel.find().select().lean().exec();
  let projectMiniDetail = {};
  product.forEach((x) => {
    if (body.slug == x.slug) {
      projectMiniDetail = x;
    }
  });

  let relatedProject = await ProjectModel.find({
    _id: { $in: projectMiniDetail.relatedprojects },
  })
    .select({ name: 1, baseimage: 1, slug: 1 })
    .lean()
    .exec();

  if (projectMiniDetail.image) {
    projectMiniDetail.image =
      config.upload_folder +
      config.upload_entities.product_option_image_folder +
      projectMiniDetail.image;
  }
  if (projectMiniDetail.baseimage) {
    projectMiniDetail.baseimage =
      config.upload_folder +
      config.upload_entities.product_option_image_folder +
      projectMiniDetail.baseimage;
  }

  if (projectMiniDetail.video_image) {
    projectMiniDetail.video_image =
      config.upload_folder +
      config.upload_entities.product_option_image_folder +
      projectMiniDetail.video_image;
  }

  if (projectMiniDetail.option_images.length > 0) {
    let option_images = [];
    projectMiniDetail.option_images.forEach((element) => {
      option_images.push({
        image:
          config.upload_folder +
          config.upload_entities.product_option_image_folder +
          element,
        baseimage: element,
      });
    });
    projectMiniDetail.option_images = option_images;
  }

  if (relatedProject.length > 0) {
    relatedProject.forEach((element) => {
      element.baseimage =
        config.upload_folder +
        config.upload_entities.product_option_image_folder +
        element.baseimage;
    });
  }

  projectMiniDetail.relatedProjectsDetail = relatedProject;
  return projectMiniDetail;
};
let getSearchResults = async (body) => {
    
    console.log(body.searchtext)
    let findData = {};
    if (body.searchtext) {
        findData["$or"] = [
                {name: {$regex: new RegExp(body.searchtext, 'ig')}},
                {slug: {$regex: new RegExp(body.searchtext, 'ig')}}
            ]
    }
    let product = await ProductOptionsModal
        .find(findData)
        .select({name:1,slug:1,image:1,selectedcolor:1})
        .lean()
        .exec();
        product.forEach((element) => {
            element.image = config.upload_folder + config.upload_entities.product_option_image_folder + element.image;
    });
return product;
    
}
let getProjectOverViewData = async (body) => {
    
    let allCategory = await CategoryModel
        .find({})
        .sort({ displayorder: 1 })
        .collation({ 'locale': 'en' })        
        .select()
        .lean()
        .exec()
    allCategory.forEach(element => {
        element.image = config.base_url + "/" + config.upload_folder + config.upload_entities.category_folder + element.image;

        element.category_image = config.upload_folder + config.upload_entities.category_folder + element.category_image;
        element.award_image = config.upload_folder + config.upload_entities.category_folder + element.award_image;
        
        if(element.video_image){
            element.video_image = config.upload_folder + config.upload_entities.category_folder + element.video_image;
        }
        if(element.banner_image){
            element.banner_image = config.upload_folder + config.upload_entities.category_folder + element.banner_image;
        }
        if(element.smallicon_image){
            element.smallicon_image = config.upload_folder + config.upload_entities.category_folder + element.smallicon_image;
        }        
    });


    
    return allCategory;
}
// let setimages = async (body) => {
//     let allCategory = await ProductOptionsModal
//     .find({})
//     .sort({ displayorder: 1 })
//     .collation({ 'locale': 'en' })        
//     .select()
//     .lean()
//     .exec()
//     for(let i=0;i<allCategory.length;i++){
//         console.log(i)
//         let newimage = allCategory[i].image.split(".")[0]+"-small.png";
//         await ProductOptionsModal
//         .updateOne({ _id: ObjectId(allCategory[i]._id) }, { $set: {visualiserimage:newimage} })
//         .exec();
        
        
//     }

//     return "done";
// }
module.exports = {
  getSearchResults,
  getProjectOverViewData,
  getAllProjects,
  removeProjects,
  getAllColor,
  addColor,
  getAllThickness,
  getAllProjectList,
  addThickness,
  getAllWear,
  addLength,
  getAllMaterial,
  addMaterial,
  getAllFloor,
  getAllSize,
  addProduct,
  getProduct,
  getProjectDetail,
  getProjectMiniDetailForWebsite,
  getAllProductCategory,
  addSize,
  getAllProductSize,
  addSize,
  getAllWearLayer,
  addWearLayer,
  getAllPad,
  addPad,
  getAllCore,
  addCore,
  getAllProductListForSubProduct,
  addSubProduct,
  getSubProduct,
  getSEODetails,
  getAllProjectCategoryList,
  addProject,
  getProjectFullDetailForWebsite,
  getAllLength,
  duplicateSubProduct
};