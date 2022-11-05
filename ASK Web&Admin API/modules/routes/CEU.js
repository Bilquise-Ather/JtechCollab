'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/CEU"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

router.get('/get_CEU', authMiddleware.verifyToken, controller.getCEUData);
router.put('/update_CEU', authMiddleware.verifyToken, helper.uploadCEUImage.single('slider_image'), controller.updateCEU);

router.post('/add_CEU_seo', authMiddleware.verifyToken, controller.addCEUSeo);
router.post('/get_CEU_seo', authMiddleware.verifyToken, controller.getCEUSeo);

//website
router.get('/get_all_CEU_for_website', authMiddleware.verifyAPIKey, controller.getCEUForWebsite);
module.exports = router;


