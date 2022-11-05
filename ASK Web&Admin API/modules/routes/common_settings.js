'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/common_settings"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

router.get('/get_common_settings', authMiddleware.verifyToken, controller.getInitialData);
router.put('/update_common_settings', authMiddleware.verifyToken, helper.uploadLogoIcon.single('logo_icon'), controller.updateCommonSettings);

//website
router.get('/get_initial_data_for_website', authMiddleware.verifyAPIKey, controller.getInitialDataForWebsite);
module.exports = router;


