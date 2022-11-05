'use strict';

let express    = require("express"),
    router     = express.Router(),
    controller = require("../controllers/collection"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");

//Admin Panle
router.post('/add_collection',authMiddleware.verifyToken,helper.uploadCollectionImage.any() , controller.addCollection);    
router.post('/get_all_collection',authMiddleware.verifyToken, controller.getAllCollection);    
router.post('/get_all_collection_for_home_with_filter', controller.getAllCollectionWithFilter);    

router.put("/update_collection/:slider_id",authMiddleware.verifyToken,helper.uploadCollectionImage.single('collection_image'), controller.updateCollection);
router.delete("/remove_collection/:slider_id", authMiddleware.verifyToken,controller.deleteCollection);
router.post('/get_single_collection',authMiddleware.verifyToken, controller.getSingleCollection);    

//website
router.get('/get_all_collection_for_home', authMiddleware.verifyAPIKey, controller.getAllCollectionForHome);    
router.get('/get_all_collection_for_visualiser', authMiddleware.verifyAPIKey, controller.getAllCollectionForVisualiser);    

module.exports = router;


