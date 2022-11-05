'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/privacy_policy"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_privacy_policy', authMiddleware.verifyToken, controller.addPrivacyPolicy);
router.post('/get_privacy_policy', authMiddleware.verifyToken, controller.getPrivacyPolicy);
//website
router.get('/get_privacy_policy_for_website', authMiddleware.verifyAPIKey, controller.getPrivacyPolicyForWebsite);
module.exports = router;


