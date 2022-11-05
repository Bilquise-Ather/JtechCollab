'use strict';

let express    = require("express"),
    router     = express.Router(),
    controller = require("../controllers/contact_us"),
    helper = require("../helpers/fileUpload"),
    authMiddleware = require("../middleware/authValidation");


router.post('/get_contact_us',authMiddleware.verifyToken, controller.getContectUs);  
router.delete("/remove_contact_us/:slider_id",authMiddleware.verifyToken, controller.deleteContactUs);   
router.post('/add_contact_us_seo', authMiddleware.verifyToken, controller.addContactUsSeo);    
router.post('/get_contact_us_seo', authMiddleware.verifyToken, controller.getContactUsSeo);
//website
router.post('/add_contact_us_for_website',authMiddleware.verifyAPIKey , controller.addContactUS);
router.post('/order_for_website', controller.orderForm);
router.post('/credit_application_for_website', helper.uploadCreditApplicationImage.fields([{ name: 'slider_image'}]),controller.CreditApplicationForm);
router.post('/claim_application_for_website', helper.uploadClaimApplicationImage.fields([{ name: 'slider_image'}]),controller.ClaimApplicationForm);


module.exports = router;
 

