'use strict';

let _ = require('lodash');
/**
 * Check for null or undefined value of argument
 */
let undefinedOrNull = arg => (typeof arg === 'undefined' || arg === null)

let isEmpty = arg => _.isEmpty(arg);

let sanitize = (sanitizeObject, sanitizeDefault) => {

    if (sanitizeObject == null || typeof (sanitizeObject) === 'undefined' || sanitizeObject === '') {
        sanitizeObject = JSON.stringify(sanitizeDefault);
    }

    try {
        sanitizeObject = JSON.parse(sanitizeObject);
    } catch (e) {
        sanitizeObject = sanitizeDefault;
    }

    return sanitizeObject;
};

let sanitizeJSON = (sanitizeObject, sanitizeDefault) => {
    if (sanitizeObject == null || typeof (sanitizeObject) === 'undefined' || sanitizeObject === '') {
        sanitizeObject = sanitizeDefault;
    }

    return sanitizeObject;
};

let sanitizeJSONAsString = (sanitizeObject, sanitizeDefault) => {
    if (sanitizeObject == null || typeof (sanitizeObject) === 'undefined' || sanitizeObject === '') {
        sanitizeObject = sanitizeDefault;
    }

    try {
        return JSON.stringify(sanitizeObject);
    } catch (e) {
        return JSON.stringify(sanitizeDefault);
    }
};

module.exports = {
    undefinedOrNull: undefinedOrNull,
    isEmpty: isEmpty,
    sanitize: sanitize,
    sanitizeJSON: sanitizeJSON,
    sanitizeJSONAsString: sanitizeJSONAsString,
};
