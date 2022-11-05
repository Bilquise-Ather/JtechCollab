'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/rooms_website"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");


//website
router.get('/get_all_room_images_for_website', authMiddleware.verifyAPIKey, controller.getAllSlideForWebsite);
router.get('/get_all_colors', authMiddleware.verifyAPIKey, controller.getAllColor);
router.post('/get_searched_rooms', authMiddleware.verifyAPIKey, controller.getSearchedRoom);
router.post('/get_room_details_for_website', authMiddleware.verifyAPIKey, controller.getRoomDetails);
module.exports = router;


