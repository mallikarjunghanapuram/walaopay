"use strict";

exports.responseStatus = responseCode => {
    switch (responseCode) {
        case "000":
            return 'SUCCESS';
        case "001":
            return 'PENDING';
        case "002":
            return 'Bank Success';
        case "111":
            return 'FAIL';
        case "112":
            return 'Login Error';
        case "113":
            return 'Amount Error';
        case "114":
            return 'Pin Error';
        case "115":
            return 'Pin Timeout';
        case "116":
            return 'Login Timeout';
        case "117":
            return 'Account Timeout';
        case "118":
            return 'Security question error';
        case "200":
            return 'Refunded';
    }
};

exports.responsePayoutStatus = responseCode => {
    switch (responseCode) {
        case "000":
            return 'SUCCESS';
        case "001":
            return 'PENDING';
        case "111":
            return 'FAIL';
        case "112":
            return 'REJECTED';
    }
};