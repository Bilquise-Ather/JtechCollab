'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/Tiles"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

router.post('/get_tiles19', authMiddleware.verifyToken, controller.getTiles19);
router.post('/add_tiles19', authMiddleware.verifyToken, helper.uploadAboutUsImage.any(), controller.addTiles);
router.post('/get_tiles24', authMiddleware.verifyToken, controller.getTiles24);
router.post('/add_tiles24', authMiddleware.verifyToken, helper.uploadAboutUsImage.any(), controller.addTiles24);
router.post('/get_tiles_for_admin', authMiddleware.verifyToken, controller.getTilesForAdmin);


router.post('/add_tile_data', authMiddleware.verifyToken, helper.uploadProfileImage.single('slider_image'), controller.addTileData);
router.post('/get_all_tile_data', authMiddleware.verifyToken, controller.getAllTileData);
router.put("/update_tile_data/:slider_id", authMiddleware.verifyToken, helper.uploadProfileImage.single('slider_image'), controller.updateTileData);
router.delete("/remove_tile_data/:slider_id", authMiddleware.verifyToken, controller.deleteTileData);


//website
router.get('/get_tiles_19_data', authMiddleware.verifyAPIKey, controller.getTiles19DataWebsite);
router.get('/get_tiles_24_data', authMiddleware.verifyAPIKey, controller.getTiles24DataWebsite);
module.exports = router;


