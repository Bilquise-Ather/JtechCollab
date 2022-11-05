/**
 * Global configuration for running server will reside here
 * ALL DB configuration, S3, and other apis calling url
 * along with their host name and port should reside here.
 *
 * This app server will get started from server/app.json file when required parameters can be
 * altered based on environment.
 */
 var config = {
    /**
     * server configuration
     */
    server: {
      port: 4000,
      networkCallTimeout: 30000,
    },
    /**
     * DB configuration
     */  
    all_south_flooring: {
      database_name: 'asfadmin',
      host: 'mongodb://asfadmin:asfadmin@3.141.56.238',
      port: 27017,
  },
  
    base_url: "http://3.141.56.238:4000",
    api_key: '12345',
    upload_folder: 'uploads',
    upload_entities: {
        slider_image_folder: '/slider_image/',
        logo_slider_image_folder: '/logo_slider_image/',
        product_image_folder: '/product_image/',
        product_option_image_folder: '/product_option_image/',
        category_folder: '/category_image/',
        icon_folder: '/icon_image/',
        logo_icon: '/logo_icon/',
        collection_folder: '/collection_image/',
        productcategory_folder: '/productcategory_image/',
        about_us_image_folder: '/about_us_image/',
        resource_image_folder: '/resource_image/',
        resource_pdf_folder: '/resource_pdf/',
        room_image_folder: "/rooms/",
      },
      from_email: "jess.pickman@allsouthflooring.com ",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      user: 'jess.pickman@allsouthflooring.com ',
      pass: 'carolinA2018!@'
  };
  
  module.exports = config;
  