'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/resource"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_resource', authMiddleware.verifyToken, helper.uploadResourceImage.any(), controller.addResource);
router.post('/get_all_resource', authMiddleware.verifyToken, controller.getAllResource);
router.delete("/remove_resource/:slider_id", authMiddleware.verifyToken, controller.deleteResource);
router.post('/edit_resource', authMiddleware.verifyToken, controller.getAllResourceToEdit);
router.post('/add_resource_seo', authMiddleware.verifyToken, controller.addResourceSeo);
router.post('/get_resource_seo', authMiddleware.verifyToken, controller.getResourceSeo);
module.exports = router;


