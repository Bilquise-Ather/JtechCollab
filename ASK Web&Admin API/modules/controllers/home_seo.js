'use strict';

let homeManager = require('../managers/home_seo');

let addHomeSeo = (req, res, next) => {
    return homeManager
        .addHomeSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getHomeSeo = (req, res, next) => {
    return homeManager
        .getHomeSeo(req.body)
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
    addHomeSeo,
    getHomeSeo
}