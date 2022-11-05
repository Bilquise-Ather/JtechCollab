'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/home_seo"),
    authMiddleware = require("../middleware/authValidation");

//admin

router.post('/add_home_seo', authMiddleware.verifyToken, controller.addHomeSeo);
router.post('/get_home_seo', authMiddleware.verifyToken, controller.getHomeSeo);
//website

module.exports = router;


