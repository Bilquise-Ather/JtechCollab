'use strict';

let termConditionManager = require('../managers/term_conditions');

let addTermsCondition = (req, res, next) => {
    return termConditionManager
        .addTermsCondition(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getTermsCondition = (req, res, next) => {
    return termConditionManager
        .getTermsCondition(req.body)
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
let getTermsConditionForWebsite = (req, res, next) => {
    return termConditionManager
        .getTermsConditionForWebsite(req.body)
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
    addTermsCondition,
    getTermsCondition,
    //website
    getTermsConditionForWebsite,
}