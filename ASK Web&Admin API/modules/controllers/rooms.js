'use strict';

let sliderManager = require('../managers/rooms');

/**
 * @swagger
 * /api/rooms/add_slider:
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
let addSlider = (req, res, next) => {

    return sliderManager
        .addSlider(req)
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
 * /api/rooms/get_all_slides:
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
let getAllSlider = (req, res, next) => {
    return sliderManager
        .getAllSlider(req.body)
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
 * /api/rooms/update_slider/{slider_id}:
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
let updateSlider = (req, res, next) => {
    return sliderManager
        .updateSlider(req)
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
 * /api/rooms/remove_slide/{slider_id}:
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
let deleteSlider = (req, res, next) => {
    return sliderManager
        .deleteSlider(req.params.slider_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
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
module.exports = {
    addSlider,
    getAllSlider,
    updateSlider,
    deleteSlider,

    //Website
    getAllSlideForWebsite
}