'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/DIY"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_DIY', authMiddleware.verifyToken, helper.uploadDIYImage.single('slider_image'), controller.addDIY);
router.post('/get_all_DIY', authMiddleware.verifyToken, controller.getAllDIY);
router.put("/update_DIY/:slider_id", authMiddleware.verifyToken, helper.uploadDIYImage.single('slider_image'), controller.updateDIY);
router.delete("/remove_DIY/:slider_id", authMiddleware.verifyToken, controller.deleteDIY);
router.post('/add_DIY_seo', authMiddleware.verifyToken, controller.addDIYSeo);
router.post('/get_DIY_seo', authMiddleware.verifyToken, controller.getDIYSeo);
//website
router.get('/get_all_DIY_for_website', authMiddleware.verifyAPIKey, controller.getAllDIYForWebsite);

module.exports = router;


