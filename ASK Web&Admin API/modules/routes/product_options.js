'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/product_options"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");


router.post('/get_all_product_options', authMiddleware.verifyToken, controller.getAllProductOptions);
router.delete('/remove_product_options/:slider_id', authMiddleware.verifyToken, controller.removeProductOptions);

module.exports = router;


