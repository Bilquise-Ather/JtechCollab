'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/footer_website_data"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_footer_website_data', authMiddleware.verifyToken, controller.addFooterWebsiteData);
router.post('/get_footer_website_data', authMiddleware.verifyToken, controller.getFooterWebsiteData);

//website
router.get('/get_footer_website_data_for_website', authMiddleware.verifyAPIKey, controller.getFooterWebsiteDataForWebsite);
module.exports = router;


