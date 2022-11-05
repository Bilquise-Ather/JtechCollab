'use strict';

let _ = require("lodash"),
    helpers = require('../helpers/helpers'),
    BadRequestError = require('../errors/badRequestError'),
    AccessDeniedError = require('../errors/accessDeniedError'),
    md5 = require('md5'),
    ejs = require('ejs'),
    fs = require('fs'),
    path = require('path'),
    config = process.config.global_config,
    validator = require('validator'),
    UsersModel = require('../models/users');

let login = async (body) => {
    if (!body) {
        throw new BadRequestError('Request body comes empty');
    }

    ['email', 'password'].forEach(x => {
        if (!body[x]) {
            throw new BadRequestError(x + " is required");
        }
    });

    if (!validator.isEmail(body.email)) {
        throw new BadRequestError("Email is invalid");
    }
    let user = await UsersModel
        .findOne({ email: body.email, password: md5(body.password) })
        .select()
        .lean()
        .exec();
    if (!user) {
        throw new BadRequestError("Either username or password is invalid");
    }
    let accessToken = md5(Date.now() + body.email);
    await UsersModel
        .updateOne({ _id: user._id }, { $set: { fpToken: accessToken, fpTokenCreatedAt: new Date() } })
        .exec();

    return {
        userId: user._id,
        accessToken: accessToken
    };
}


let resetPassword = async (body) => {

    if (!body.email || !body.password || !body.token) {
        throw new BadRequestError("data missing")
        return
    }

    body.email = body.email.trim().toLowerCase();
    let user = await UsersModel.findOne({ where: { email: body.email }, attributes: ['id', 'fpToken', 'fpTokenCreatedAt'] });

    if (!user) {
        throw new BadRequestError("Link expired.");
        return
    } else {
        if (!user.fpToken || user.fpToken != body.token) {
            throw new BadRequestError("Link expired.");
            return;
        }

        let curDate = new Date();
        let fpTokenCreatedAt = new Date(user.fpTokenCreatedAt);

        if (!fpTokenCreatedAt) {
            throw new BadRequestError("Invalid request");
            return;
        }

        let diff = (curDate.getDate() - fpTokenCreatedAt.getTime()) / (1000 * 60 * 60); // get diff in hour
        console.log("ss", diff);
        if (diff > 48) {
            throw new BadRequestError("Link expired.");
        } else {
            if (!validator.isStrongPassword(body.password, { minLength: 5, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })) {
                throw new BadRequestError("password must have minimum 5 characters with minimum one lowercase, uppercase, number and special character.");
            }

            let upUser = await UsersModel.update({ password: md5(body.password), fpToken: "" }, { where: { id: user.id } });
            return { msg: "Password reset successfully." };
        }
    }
}
let logOut = async (user) => {
    let upUser = await UsersModel.update({ fpToken: "" }, { where: { id: user.id } });
    return { msg: "logout success" };
}

module.exports = {
    login,
    resetPassword,
    logOut
};