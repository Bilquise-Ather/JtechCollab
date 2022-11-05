'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/resource_options"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/get_resource_list_for_resource_options', authMiddleware.verifyToken, controller.getAllResourceListForResourceOptions);
router.post('/add_resource_options', authMiddleware.verifyToken, helper.uploadResourcePdf.single('pdfFile'), controller.addResourceOptions);
router.post('/get_all_resource_options', authMiddleware.verifyToken, controller.getAllResourceOptions);
router.delete("/remove_resource_options/:slider_id", authMiddleware.verifyToken, controller.deleteResourceOptions);
router.post('/edit_resource_options', authMiddleware.verifyToken, controller.getAllResourceToEdit);
//website
router.get('/get_all_resource_for_website', authMiddleware.verifyAPIKey, controller.getAllResourceOptionsForWebsite);
module.exports = router;


