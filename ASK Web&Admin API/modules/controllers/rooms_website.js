'use strict';

let sliderManager = require('../managers/rooms_website');

//Website
let getAllSlideForWebsite = (req, res, next) => {
    return sliderManager
        .getAllSlideForWebsite()
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllColor = (req, res, next) => {
    return sliderManager
        .getAllColor(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getSearchedRoom = (req, res, next) => {
    return sliderManager
        .getSearchedRoom(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getRoomDetails = (req, res, next) => {
    return sliderManager
        .getRoomDetails(req.body)
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
    getAllSlideForWebsite,
    getAllColor,
    getSearchedRoom,
    getRoomDetails
}