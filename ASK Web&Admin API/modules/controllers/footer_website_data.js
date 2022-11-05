'use strict';

let footerWebsiteDataManager = require('../managers/footer_website_data');

let addFooterWebsiteData = (req, res, next) => {
    return footerWebsiteDataManager
        .addFooterWebsiteData(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getFooterWebsiteData = (req, res, next) => {
    return footerWebsiteDataManager
        .getFooterWebsiteData(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}





//website
let getFooterWebsiteDataForWebsite = (req, res, next) => {
    return footerWebsiteDataManager
        .getFooterWebsiteDataForWebsite(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
module.exports = {
    addFooterWebsiteData,
    getFooterWebsiteData,
    //website
    getFooterWebsiteDataForWebsite,
}