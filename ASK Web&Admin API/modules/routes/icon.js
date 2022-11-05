'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/icon"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");
//Admin Panle
router.post('/add_icon', authMiddleware.verifyToken, helper.uploadIconImage.single('icon_image'), controller.addIcon);
router.post('/get_all_icon', authMiddleware.verifyToken, controller.getAllIcon);
router.put("/update_icon/:slider_id", authMiddleware.verifyToken, helper.uploadIconImage.single('icon_image'), controller.updateIcon);
router.delete("/remove_icon/:slider_id", authMiddleware.verifyToken, controller.deleteIcon);

//Website
router.get('/get_all_icon_for_website', authMiddleware.verifyAPIKey, controller.getAllIconForWebsite);
module.exports = router;


