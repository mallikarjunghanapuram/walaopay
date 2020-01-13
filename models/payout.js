"use strict";

const axios = require('axios');
const querystring = require('querystring');

exports.payoutTransaction = async function (actionURL, {
    service_version,
    partner_code,
    partner_orderid,
    member_id,
    currency,
    amount,
    account_number,
    account_name,
    bank_code,
    bank_province,
    bank_city,
    bank_branch,
    notify_url,
    sign
}) {

    const params = {
        service_version,
        partner_code,
        partner_orderid,
        member_id,
        currency,
        amount,
        account_number,
        account_name,
        bank_code,
        bank_province,
        bank_city,
        bank_branch,
        notify_url,
        sign
    };

    const config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const payoutResponse = await axios.post(actionURL, querystring.stringify(params), config)
    return payoutResponse.data;
}
