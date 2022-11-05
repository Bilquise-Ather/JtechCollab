'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/product"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//Admin Panle
router.post('/get_all_product', authMiddleware.verifyToken, controller.getAllProduct);
router.delete('/remove_product/:slider_id', authMiddleware.verifyToken, controller.removeProduct);

//website
router.post('/get_all_product_website', authMiddleware.verifyAPIKey, controller.getAllProductForWebsite);
router.post('/get_all_sub_product_website', authMiddleware.verifyAPIKey, helper.uploadProductOptionImage.any(), controller.getAllSubProductForWebsite);
router.post('/get_all_searched_product_website', authMiddleware.verifyAPIKey, controller.getAllSearchedProduct);
module.exports = router;


