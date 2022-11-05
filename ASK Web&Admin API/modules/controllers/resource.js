'use strict';

let ResourceManager = require('../managers/resource');

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
let addResource = (req, res, next) => {
    return ResourceManager
        .addResource(req)
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
 * /api/home_slider/get_all_slides:
 *   post:
 *     summary: Get All Slider.
 *     tags:
 *      - Slider
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
let getAllResource = (req, res, next) => {
    return ResourceManager
        .getAllResource(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getAllResourceToEdit = (req, res, next) => {
    return ResourceManager
        .getAllResourceToEdit(req.body)
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
 * /api/home_slider/update_slider/{slider_id}:
 *   put:
 *     summary: update Slider.
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


/**
 * @swagger
 * /api/home_slider/remove_slide/{slider_id}:
 *   delete:
 *     summary: delete Slider.
 *     tags:
 *      - Slider
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
let deleteResource = (req, res, next) => {
    return ResourceManager
        .deleteResource(req.params.slider_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addResourceSeo = (req, res, next) => {
    return ResourceManager
        .addResourceSeo(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getResourceSeo = (req, res, next) => {
    return ResourceManager
        .getResourceSeo(req.body)
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
    addResource,
    getAllResource,
    deleteResource,
    getAllResourceToEdit,
    addResourceSeo,
    getResourceSeo
}