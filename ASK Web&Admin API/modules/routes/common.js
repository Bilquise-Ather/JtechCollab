'use strict';

let express    = require("express"),
    router     = express.Router(),
    controller = require("../controllers/common"), 
    helper = require("../helpers/fileUpload"),   
    authMiddleware = require("../middleware/authValidation");



router.post('/get_all_colors', authMiddleware.verifyToken, controller.getAllColor);    
router.post('/add_color', authMiddleware.verifyToken, controller.addColor);    
router.post('/get_all_thickness', authMiddleware.verifyToken, controller.getAllThickness);    
router.post('/add_thickness', authMiddleware.verifyToken, controller.addThickness);    
router.post('/get_all_length', authMiddleware.verifyToken, controller.getAllLength);    
router.post('/add_length', authMiddleware.verifyToken, controller.addLength);    
router.post('/get_all_material', authMiddleware.verifyToken, controller.getAllMaterial);    
router.post('/add_material', authMiddleware.verifyToken, controller.addMaterial);    
router.post('/add_product', authMiddleware.verifyToken,helper.uploadProductImage.any(), controller.addProduct);    
router.post('/get_product', authMiddleware.verifyToken, controller.getProduct);    
router.post('/get_all_product_category', authMiddleware.verifyToken, controller.getAllProductCategory);    
router.post('/get_all_product_size', authMiddleware.verifyToken, controller.getAllProductSize);

router.post('/add_size', authMiddleware.verifyToken, controller.addSize);    
router.post('/get_all_wear_layer', authMiddleware.verifyToken, controller.getAllWearLayer);    
router.post('/add_wear_layer', authMiddleware.verifyToken, controller.addWearLayer);    
router.post('/get_all_pad', authMiddleware.verifyToken, controller.getAllPad);    
router.post('/add_pad', authMiddleware.verifyToken, controller.addPad);    
router.post('/get_all_core', authMiddleware.verifyToken, controller.getAllCore);    
router.post('/add_core', authMiddleware.verifyToken, controller.addCore);    

router.post('/get_all_product_list_for_sub_product', authMiddleware.verifyToken, controller.getAllProductListForSubProduct);    
router.post('/get_all_project_category_list', authMiddleware.verifyToken, controller.getAllProjectCategoryList);    
router.post('/get_all_project_list', authMiddleware.verifyToken, controller.getAllProjectList);    
router.post('/add_sub_product', authMiddleware.verifyToken,helper.uploadProductOptionImage.any(), controller.addSubProduct);    
router.post('/duplicateproduct_options', authMiddleware.verifyToken, controller.duplicateSubProduct);    
router.post('/add_project', authMiddleware.verifyToken,helper.uploadProductOptionImage.any(), controller.addProject);    
router.post('/get_sub_product', authMiddleware.verifyToken, controller.getSubProduct);    
router.post('/get_project_detail', authMiddleware.verifyToken, controller.getProjectDetail);
 

router.post('/get_all_product_options', authMiddleware.verifyToken, controller.getAllProjects);    
router.delete('/remove_product_options/:id', authMiddleware.verifyToken, controller.removeProjects);    




router.post('/get_seo_details', controller.getSEODetails);    

//website
router.get('/get_all_colors', authMiddleware.verifyAPIKey, controller.getAllColor);
router.get('/get_all_thickness', authMiddleware.verifyAPIKey, controller.getAllThickness);    
router.get('/get_all_wear', authMiddleware.verifyAPIKey, controller.getAllWear);
router.get('/get_all_size', authMiddleware.verifyAPIKey, controller.getAllSize);
router.get('/get_all_floor', authMiddleware.verifyAPIKey, controller.getAllFloor);
router.get('/get_all_material', authMiddleware.verifyAPIKey, controller.getAllMaterial);
router.post('/get_project_mini_detail_for_website', authMiddleware.verifyAPIKey, controller.getProjectMiniDetailForWebsite);
router.get('/get_project_overview_data', authMiddleware.verifyAPIKey, controller.getProjectOverViewData);
router.post('/get_project_full_detail_for_website', authMiddleware.verifyAPIKey, controller.getProjectFullDetailForWebsite);   
router.post('/get_search_results', authMiddleware.verifyAPIKey, controller.getSearchResults);


module.exports = router;


