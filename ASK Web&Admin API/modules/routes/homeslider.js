'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/home_slider"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_slider', authMiddleware.verifyToken, helper.uploadProfileImage.single('slider_image'), controller.addSlider);
router.post('/get_all_slides', authMiddleware.verifyToken, controller.getAllSlider);
router.put("/update_slider/:slider_id", authMiddleware.verifyToken, helper.uploadProfileImage.single('slider_image'), controller.updateSlider);
router.delete("/remove_slide/:slider_id", authMiddleware.verifyToken, controller.deleteSlider);
//website
router.get('/get_all_slides_for_website', authMiddleware.verifyAPIKey, controller.getAllSlideForWebsite);

module.exports = router;


