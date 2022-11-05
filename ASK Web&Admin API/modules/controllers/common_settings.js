'use strict';

let CommonSettingsManager = require('../managers/common_settings');


/**
 * @swagger
 * /api/common_settings/get_initial_data:
 *   post:
 *     summary: Get All Common Settings.
 *     tags:
 *      - Common Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *                 paramType: body
 *     responses:
 *       200:
 *         description: Commong Settings
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
let getInitialData = (req, res, next) => {
    return CommonSettingsManager
        .getInitialData(req)
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
 * /api/common_settings/update_common_settings/{slider_id}:
 *   put:
 *     summary: update Common Settings.
 *     tags:
 *      - Common Settings
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: file
 *                 example: 12345
 *                 paramType: body
 *               facebook:
 *                 type: string
 *                 example: 12345
 *                 paramType: body
 *               twitter:
 *                 type: string
 *                 example: 12345
 *                 paramType: body
 *               call:
 *                 type: string
 *                 example: 12345
 *                 paramType: body
 *               email:
 *                 type: string
 *                 example: 12345
 *                 paramType: body
 *               address:
 *                 type: string
 *                 example: 12345
 *                 paramType: body
 *               map:
 *                 type: string
 *                 example: 12345
 *                 paramType: body
 *     responses:
 *       200:
 *         description: slider object
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
let updateCommonSettings = (req, res, next) => {
    return CommonSettingsManager
        .updateCommonSettings(req)
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
 * /api/common_settings/get_initial_data_for_website:
 *   post:
 *     summary: Get All Common Settings For Websites.
 *     tags:
 *      - Common Settings
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 example: 1
 *               limit:
 *                 type: number
 *                 example: 10
 *                 paramType: body
 *     responses:
 *       200:
 *         description: Commong Settings
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
let getInitialDataForWebsite = (req, res, next) => {
    return CommonSettingsManager
        .getInitialDataForWebsite(req)
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
    getInitialData,
    updateCommonSettings,
    //website
    getInitialDataForWebsite
}