'use strict';

let authenticationManager = require('../managers/authentication');

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: User Login.
 *     tags:
 *      - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: sagarss191@gmail.com
 *               password:
 *                 type: string
 *                 example: 12345
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
let login = (req, res, next) => {

    return authenticationManager
        .login(req.body)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset Password.
 *     tags:
 *      - auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 description: new password
 *                 example: password
 *               token:
 *                 type: string
 *                 description: token get in email
 *                 example: token
 *     responses:
 *       200:
 *         description: reset password
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
let resetPassword = (req, res, next) => {

    return authenticationManager
        .resetPassword(req.body)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: logout.
 *     tags:
 *      - auth 
 *     responses:
 *       200:
 *         description: logout
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
let logOut = (req, res, next) => {

    return authenticationManager
        .logOut(req.user)
        .then(data => {
            return res.json({
                data: data
            });
        })
        .catch(next);
}
module.exports = {
    login,
    resetPassword,
    logOut
}