'use strict';

let _ = require("lodash"),
    UnauthorizedError = require('../errors/unauthorizedError'),
    AccessDeniedError = require('../errors/accessDeniedError'),
    config = process.config.global_config,
    UsersModel = require('../models/users');;

let verifyToken = async (req,res,next) => {
	let token = req.get('x-auth-token');
	
    if (!token) {
        
		return res.json({
			status:400,
			data: {msg: "You are not authorized."}
		});
		
    }
	
	let user = await UsersModel
    .findOne({fpToken:token})
    .select()
    .lean()
    .exec();	
	if(!user){
		return res.json({
			status:400,
			data: {msg: "You are not authorized."}
		});
	}else{
		req.user = {
			_id: user._id,
			email: user.email
		  };
		next();
	}
}
let verifyAPIKey = async (req,res,next) => {
	let APIkey = req.get('x-api-key');	
    if (!APIkey || APIkey != config.api_key) {
        
		return res.json({
			status:400,
			data: {msg: "You are not authorized."}
		});
		
    }
	next();
}

module.exports = {
	verifyToken,
	verifyAPIKey
}