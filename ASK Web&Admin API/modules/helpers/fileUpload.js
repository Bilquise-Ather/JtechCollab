const multer = require('multer')

const mime_type = {
	"application/msword": "doc",
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": 'docx',
	"text/plain": 'txt',
	"application/pdf": 'pdf',
	"application/rtf": 'rtf',
	"image/png": "png",
	"image/jpg": 'jpg',
	"image/jpeg": 'jpg',
	"image/gif": 'gif',
	"application/vnd.ms-excel": "csv",

}
'use strict';
let config = process.config.global_config;


let uploadProfileImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.slider_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});


let uploadLogoImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.logo_slider_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadProductImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.product_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadCategoryImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.category_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadIconImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.icon_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadLogoIcon = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.logo_icon);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadCollectionImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.collection_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadProductCategoryImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.productcategory_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadProductOptionImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.product_option_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadResourceImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.resource_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});
let uploadResourcePdf = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.resource_pdf_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);

		}

	})
});
let uploadAboutUsImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.about_us_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadDIYImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.DIY_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

let uploadCEUImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.CEU_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});
let uploadRoomImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.room_image_folder);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});
let uploadCreditApplicationImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.credit_application_image);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});
let uploadClaimApplicationImage = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, config.upload_folder + config.upload_entities.claim_application_image);
		},
		filename: function (req, file, callback) {
			let fileName = Date.now() + Math.round(Math.random() * 10000) + '.' + mime_type[file.mimetype]
			callback(null, fileName);
		}
	})
});

module.exports = { uploadRoomImage,uploadProfileImage, uploadLogoImage, uploadIconImage, uploadCategoryImage, uploadLogoIcon, uploadProductCategoryImage, uploadProductImage, uploadProductOptionImage, uploadAboutUsImage, uploadResourceImage, uploadResourcePdf, uploadCollectionImage, uploadDIYImage, uploadCEUImage,uploadCreditApplicationImage,uploadClaimApplicationImage }