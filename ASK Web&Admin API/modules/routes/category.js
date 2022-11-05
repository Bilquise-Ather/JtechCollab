'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/category"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//Admin Panle
router.post('/add_category', authMiddleware.verifyToken, helper.uploadCategoryImage.any(), controller.addCategory);
router.post('/get_all_category', authMiddleware.verifyToken, controller.getAllCategory);
router.put("/update_category/:slider_id", authMiddleware.verifyToken, helper.uploadCategoryImage.any(), controller.updateCategory);
router.delete("/remove_category/:slider_id", authMiddleware.verifyToken, controller.deleteCategory);

//Website
router.get('/get_all_category_for_website', authMiddleware.verifyAPIKey, controller.getAllCategoryForWebsite);

module.exports = router;


