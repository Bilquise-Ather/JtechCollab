'use strict';

let tilesManager = require('../managers/Tiles');

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


let getTiles19 = (req, res, next) => {
    return tilesManager
        .getTiles19()
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let addTiles = (req, res, next) => {
    return tilesManager
        .addTiles(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getTiles24 = (req, res, next) => {
    return tilesManager
        .getTiles24()
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}


let addTiles24 = (req, res, next) => {
    return tilesManager
        .addTiles24(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getTilesForAdmin = (req, res, next) => {
    return tilesManager
        .getTilesForAdmin()
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let addTileData = (req, res, next) => {

    return tilesManager
        .addTileData(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getAllTileData = (req, res, next) => {
    return tilesManager
        .getAllTileData(req.body)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let updateTileData = (req, res, next) => {
    return tilesManager
        .updateTileData(req)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let deleteTileData = (req, res, next) => {
    return tilesManager
        .deleteTileData(req.params.slider_id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}

let getTiles19DataWebsite = (req, res, next) => {
    return tilesManager
        .getTiles19DataWebsite()
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);
        })
        .catch(next);
}
let getTiles24DataWebsite = (req, res, next) => {
    return tilesManager
        .getTiles24DataWebsite()
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
    getTiles19,
    addTiles,
    getTiles24,
    addTiles24,
    getTilesForAdmin,
    addTileData,
getAllTileData,
updateTileData,
deleteTileData,
getTiles19DataWebsite,
getTiles24DataWebsite
}