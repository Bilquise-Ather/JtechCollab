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
    port: 3000,
    networkCallTimeout: 30000,
  },
  /**
   * DB configuration
   */

  //  all_south_flooring: {
  //   database_name: 'all_south_flooring',
  //   host: 'mongodb://localhost',
  //   port: 27017,
  //  },
   all_south_flooring: {
    database_name: 'asfadmin',
    host: 'mongodb://asfadmin:asfadmin@3.141.56.238',
    port: 27017,
  },
  base_url: "http://localhost:3000",
  api_key: "12345",
  upload_folder: "uploads",
  upload_entities: {
    slider_image_folder: "/slider_image/",
    logo_slider_image_folder: "/logo_slider_image/",
    product_image_folder: "/product_image/",
    product_option_image_folder: "/product_option_image/",
    category_folder: "/category_image/",
    icon_folder: "/icon_image/",
    logo_icon: "/logo_icon/",
    collection_folder: "/collection_image/",
    productcategory_folder: "/productcategory_image/",
    about_us_image_folder: "/about_us_image/",
    resource_image_folder: "/resource_image/",
    resource_pdf_folder: "/resource_pdf/",
    DIY_image_folder: "/DIY_image/",
    CEU_image_folder: "/CEU_image/",
    room_image_folder: "/rooms/",
    credit_application_image:"/credit_application/",
    claim_application_image:"/claim_application/"
  },
  SENDGRID_API_KEY:"",
  from_email: "",
      host: "",
      port: 587,
      secure: false,
      user: ' ',
      pass: ''
};

module.exports = config;
