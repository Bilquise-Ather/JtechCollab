'use strict';

let express = require("express"),
    router = express.Router(),
    controller = require("../controllers/faqs"),
    authMiddleware = require("../middleware/authValidation");

//admin
router.post('/add_faqs', authMiddleware.verifyToken, controller.addFaqs);
router.post('/get_all_faqs', authMiddleware.verifyToken, controller.getAllFaqs);
router.put("/update_faqs/:slider_id", authMiddleware.verifyToken, controller.updateFaqs);
router.delete("/remove_faqs/:slider_id", authMiddleware.verifyToken, controller.deleteFaqs);
router.post('/add_faqs_seo', authMiddleware.verifyToken, controller.addFaqsSeo);
router.post('/get_faqs_seo', authMiddleware.verifyToken, controller.getFaqsSeo);


router.post('/add_search_seo', authMiddleware.verifyToken, controller.addSearchSeo);
router.post('/get_search_seo', authMiddleware.verifyToken, controller.getSearchSeo);

router.post('/add_project_seo', authMiddleware.verifyToken, controller.addProjectSeo);
router.post('/get_project_seo', authMiddleware.verifyToken, controller.getProjectSeo);

router.post('/add_visualiser_seo', authMiddleware.verifyToken, controller.addVisualiserSeo);
router.post('/get_visualiser_seo', authMiddleware.verifyToken, controller.getVisualiserSeo);

router.post('/add_gallery_seo', authMiddleware.verifyToken, controller.addGallerySeo);
router.post('/get_gallery_seo', authMiddleware.verifyToken, controller.getGallerySeo);
//website
router.get('/get_all_faqs_for_website', authMiddleware.verifyAPIKey, controller.getAllFaqsForWebsite);
module.exports = router;


