'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/authentication"),
    authMiddleware = require("../middleware/authValidation");

router.post("/login", controller.login);
router.post("/reset-password", controller.resetPassword);
router.post("/logout", authMiddleware.verifyToken, controller.logOut);


module.exports = router;


