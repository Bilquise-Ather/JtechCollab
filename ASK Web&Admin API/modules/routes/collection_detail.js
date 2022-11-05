'use strict';

let express    = require("express"),
    router     = express.Router(),
    controller = require("../controllers/collection_detail"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");
  

//website
router.post('/get_all_collection_detail', authMiddleware.verifyAPIKey, controller.getAllCollectionForHome);
router.post('/get_sub_collection_detail', authMiddleware.verifyAPIKey, controller.getSubCollectionForHome);
module.exports = router;


