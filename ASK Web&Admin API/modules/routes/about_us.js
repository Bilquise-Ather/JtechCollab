'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/aboutUs"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

router.get('/get_about_us', authMiddleware.verifyToken, controller.getAboutUs);
router.post('/add_about_us', authMiddleware.verifyToken, helper.uploadAboutUsImage.any(), controller.addAboutUs);

//website
router.get('/get_about_us_website', authMiddleware.verifyAPIKey, controller.getAboutUsWebsite);
module.exports = router;


