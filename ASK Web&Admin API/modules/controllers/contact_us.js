'use strict';

let contactUSManager = require('../managers/contact_us');



let addContactUsSeo = (req, res, next) => {
    return contactUSManager
        .addContactUsSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getContactUsSeo = (req, res, next) => {
    return contactUSManager
        .getContactUsSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
/**
 * @swagger
 * /api/home_slider/add_slider:
 *   post:
 *     summary: Add Slide to home.
 *     tags:
 *      - Slider
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               slider_image:
 *                 type: file
 *                 example: ""
 *               slidertext:
 *                 type: string
 *                 example: 12345
 *                 paramType: body
 *     responses:
 *       200:
 *         description: user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       400:
 *         description: error in request processing
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
*/
let addContactUS = (req, res, next) => {

    return contactUSManager
        .addContactUs(req, res)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getContectUs = (req, res, next) => {
    return contactUSManager
        .getContectUs(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let orderForm = (req, res, next) => {
    return contactUSManager
        .orderForm(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let CreditApplicationForm = (req, res, next) => {
    return contactUSManager
        .CreditApplicationForm(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let ClaimApplicationForm = (req, res, next) => {
    return contactUSManager
        .ClaimApplicationForm(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let deleteContactUs = (req, res, next) => {
    return contactUSManager
        .deleteContactUs(req.params.slider_id)
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
    getContectUs,
    deleteContactUs,
    addContactUsSeo,
    getContactUsSeo,
    //website
    addContactUS,
    orderForm,
    CreditApplicationForm,
    ClaimApplicationForm
}