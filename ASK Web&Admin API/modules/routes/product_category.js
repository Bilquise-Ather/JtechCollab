'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/productcategory"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");
//Admin Panle
router.post('/add_product_category', authMiddleware.verifyToken, helper.uploadProductCategoryImage.single('productcategory_image'), controller.addProductCategory);
router.post('/get_all_product_category', authMiddleware.verifyToken, controller.getAllProductCategory);
router.put("/update_product_category/:slider_id", authMiddleware.verifyToken, helper.uploadProductCategoryImage.single('productcategory_image'), controller.updateProductCategory);
router.delete("/remove_product_category/:slider_id", authMiddleware.verifyToken, controller.deleteProductCategory);
//website
router.get('/get_all_product_category_for_website', authMiddleware.verifyAPIKey, controller.getAllProcuctCategoryForWebsite);
module.exports = router;


