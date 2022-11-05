'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/term_conditions"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_terms_condition', authMiddleware.verifyToken, controller.addTermsCondition);
router.post('/get_terms_condition', authMiddleware.verifyToken, controller.getTermsCondition);

//website
router.get('/get_terms_condition_for_website', authMiddleware.verifyAPIKey, controller.getTermsConditionForWebsite);
module.exports = router;


