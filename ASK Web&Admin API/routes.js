'use strict';

const HTTP_STATUS = require('./modules/constants/httpStatus');
const authMiddleware = require("./modules/middleware/authValidation");

module.exports = app => {
    app.get('/',(req,res,next) => {
        return res.status(200).send("Api is Alive V0.1");
    });

    app.use((req, res, next) => {
        console.log("Request", req.url)
        next();       
    });
    app.use('/api/v1/auth',require('./modules/routes/authentication'));

    app.use('/api/home_slider',require('./modules/routes/homeslider'));
    app.use('/api/rooms',require('./modules/routes/rooms'));
    app.use('/api/rooms_website',require('./modules/routes/rooms_website'));
    app.use('/api/rooms_path',require('./modules/routes/rooms_path'));
    app.use('/api/category',require('./modules/routes/category'));

    app.use('/api/icon',require('./modules/routes/icon'));

    app.use('/api/common',require('./modules/routes/common'));

    app.use('/api/common_settings',require('./modules/routes/common_settings'));

    app.use('/api/collection',require('./modules/routes/collection'));

    app.use('/api/product_category',require('./modules/routes/product_category'));
    app.use('/api/gallery',require('./modules/routes/gallery'));
    

    app.use('/api/product',require('./modules/routes/product'));

    app.use('/api/product_options',require('./modules/routes/product_options'));

    app.use('/api/about_us',require('./modules/routes/about_us'));

    app.use('/api/contact_us',require('./modules/routes/contact_us'));

    app.use('/api/resource',require('./modules/routes/resource'));

    app.use('/api/resource_options',require('./modules/routes/resource_options'));

    app.use('/api/faqs',require('./modules/routes/faqs'));

    app.use('/api/privacy_policy',require('./modules/routes/privacy_policy'));

    app.use('/api/term_conditions',require('./modules/routes/term_conditions'));
    
    app.use('/api/footer_website_data',require('./modules/routes/footer_website_data'));

    app.use('/api/collection_detail',require('./modules/routes/collection_detail'));

    app.use('/api/home_seo',require('./modules/routes/home_seo'));

    app.use('/api/DIY',require('./modules/routes/DIY'));

    app.use('/api/CEU',require('./modules/routes/CEU'));
    app.use('/api/tiles',require('./modules/routes/Tiles'));

    
    app.use((req, res, next) => {
        if (res._headerSent) {
            return next();
        }
        res.status(HTTP_STATUS.NOT_FOUND).json({error: 'This route doesn\'t exist'});
    });
};