"use strict";

const crypto = require("crypto");
const variables = require("../variables");
const parameterStoreService = require("../utilities/parameterStore");

exports.generateSignature = async object => {
    let private_key="DvDWdtY3LO1A3UbJa6Nr4FUvwlfkAX9z";


    // if (!private_key) {
    //     private_key = await parameterStoreService.getParameter(
    //         variables.walaopayPrivateKeyLocation
    //     );
    // }

    

    let paramString = objectToParamString(object);
    paramString = paramString + "&key=" + private_key;
    const shasum = crypto.createHash('sha1');
    shasum.update(paramString);
    const signature = shasum.digest('hex');

    
    

    return signature.toUpperCase();
};

const objectToParamString = requestObj => {
    const paramString = Object.entries(requestObj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');
    return paramString;
}

exports.objectToParamString = objectToParamString;