// dependencies
var CryptoA:any = require("crypto");
var Events:any  = require("events");
var Util:any    = require("util");
var Url:any     = require("url");
var debug:any   = require("debug")("ali-mns-plus");

var axios = require('axios').default;

var RequestP = function (req) {
    if (typeof req === 'object') {
        if (req.hasOwnProperty('json') && typeof req['json'] === 'object') {
            req['data'] = req['json'];
        } else if (req.hasOwnProperty('body')) {
            req['data'] = req['body'];
        }
    }
    // axios does not like undefined headers
    const headers = req['headers'] || {};
    for (const header of Object.keys(headers)) {
        if (headers[header] === undefined) {
            delete headers[header];
        }
    }

    if (req.forceRemoveHeaders) {
        const forceRemove = JSON.parse(JSON.stringify({headers: req.forceRemoveHeaders}));
        const method = req.method.toLowerCase();
        req.transformRequest = [function (data, headers) {
            forceRemove.headers.forEach(frh => {
                if (headers.hasOwnProperty(frh)) {
                    delete headers[frh];
                }
                if (headers.common.hasOwnProperty(frh)) {
                    delete headers.common[frh];
                }
                if (headers[method].hasOwnProperty(frh)) {
                    delete headers[method][frh];
                }
            });
            return data;
        }];
        delete req.forceRemoveHeaders;
    }

    const requestId = 'request-id:' + Math.floor(Math.random() * 10000000);
    const printReq = JSON.parse(JSON.stringify(req));
    if (printReq.headers.hasOwnProperty('Authorization')) {
        printReq.headers['Authorization'] = '******';
    }
    debug(`${requestId}, request:`, printReq);

    return axios(req).then(response => {
        response['body'] = response['data'];
        response['statusCode'] = response['status'];
        debug(`${requestId}, response status:${response['statusCode']}, body:`, response['body'] ? response['body'] : 'None');
        return Promise.resolve(response);
    }).catch(error => {
        error['statusCode'] = error.response && error.response['status'];
        error['status'] = error.response && error.response['status'];
        error['body'] = error.response && error.response['data'];
        error.name = 'Request error';
        debug(`${requestId}, response error status: ${error['status']}, code:${error['code']}, body:`, error['body'] ? error['body'] : 'None');
        return Promise.reject(error);
    });
}

var Xml2js:any  = require("xml2js");
Xml2js.parseStringP = function(data:any, options?:any) {
    return new Promise((resolve, reject) => {
        Xml2js.parseString(data, options, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
