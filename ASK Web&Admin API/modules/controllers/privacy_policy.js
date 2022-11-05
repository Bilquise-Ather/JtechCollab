'use strict';

let collectionManager = require('../managers/privacy_policy');

let addPrivacyPolicy = (req, res, next) => {
    return collectionManager
        .addPrivacyPolicy(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getPrivacyPolicy = (req, res, next) => {
    return collectionManager
        .getPrivacyPolicy(req.body)
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
let getPrivacyPolicyForWebsite = (req, res, next) => {
    return collectionManager
        .getPrivacyPolicyForWebsite(req.body)
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
    addPrivacyPolicy,
    getPrivacyPolicy,
    getPrivacyPolicyForWebsite,
}