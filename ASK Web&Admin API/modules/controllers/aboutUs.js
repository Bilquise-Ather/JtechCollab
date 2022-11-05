'use strict';

let aboutUsManager = require('../managers/aboutus');

/**
 * @swagger
 * /api/link/addlink:
 *   post:
 *     summary: Add link.
 *     tags:
 *      - Link
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               linktext:
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


let getAboutUs = (req, res, next) => {
    return aboutUsManager
        .getAboutUs()
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let addAboutUs = (req, res, next) => {
    return aboutUsManager
        .addAboutUs(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAboutUsWebsite = (req, res, next) => {
    return aboutUsManager
        .getAboutUsWebsite()
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
    getAboutUs,
    addAboutUs,
    getAboutUsWebsite
}