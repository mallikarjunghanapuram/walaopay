"use strict";

const axios = require('axios');
const querystring = require('querystring');

exports.gateWayHandler = async function (actionURL, params) {

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const gateWayResponse = await axios.post(actionURL, querystring.stringify(params), config)

    return gateWayResponse.data;
}