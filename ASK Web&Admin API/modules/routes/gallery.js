'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/gallery"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");
//Admin Panle
router.post('/add_gallery', authMiddleware.verifyToken, helper.uploadProductCategoryImage.single('productcategory_image'), controller.addGallery);
router.post('/get_all_gallery', authMiddleware.verifyToken, controller.getAllGallery);
router.put("/update_gallery/:slider_id", authMiddleware.verifyToken, helper.uploadProductCategoryImage.single('productcategory_image'), controller.updateGallery);
router.delete("/remove_gallery/:slider_id", authMiddleware.verifyToken, controller.deleteGallery);
//website
router.get('/get_all_gallery_for_website', authMiddleware.verifyAPIKey, controller.getAllGalleryForWebsite);
module.exports = router;


