'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/rooms_path"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_slider', authMiddleware.verifyToken,  helper.uploadRoomImage.single('slider_image'),controller.addSlider);
router.post('/get_all_slides', authMiddleware.verifyToken, controller.getAllSlider);
router.post('/get_all_rooms', authMiddleware.verifyToken, controller.getAllRooms);
router.post('/get_all_product_options', authMiddleware.verifyToken, controller.getAllProductOptions);


router.put("/update_slider/:slider_id", authMiddleware.verifyToken, helper.uploadRoomImage.single('slider_image'),controller.updateSlider);
router.delete("/remove_slide/:slider_id", authMiddleware.verifyToken, controller.deleteSlider);
//website
router.get('/get_all_slides_for_website', authMiddleware.verifyAPIKey, controller.getAllSlideForWebsite);

module.exports = router;


