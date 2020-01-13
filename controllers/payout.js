"use strict";

const payoutMapper = require("../mappers/payout");
const errorResponseHandler = require("../utilities/pc-helpers/errorResponseHandler");
const payoutRules = require("../validation-rules/payout");
const { transformer } = require("../utilities/transformers");
const { validate } = require("../utilities/validator");
const { generateSignature } = require("../utilities/generateSignature");
const { payoutTransaction } = require("../models/payout")
const { responsePayoutStatus } = require("../utilities/responseStatusFormatter");
const xml2js = require('xml2js');
const util = require('util');

xml2js.parseStringPromise = util.promisify(xml2js.parseString);

const variables = require("../variables");

exports.payout = async function (ctx) {
    try {
        const {
            merchantId,
            currency,
            vendorOrderId,
            amount,
            bankName,
            accountNumber,
            accountName,
            bankProvince,
            bankCity,
            subBankName,
            remark
        } = ctx.request.body;

        const payoutRequest = {
            merchantId,
            currency,
            vendorOrderId,
            memberId: variables.userId,
            amount: (amount * 100).toString(),
            bankName,
            accountNumber,
            accountName,
            bankProvince,
            bankCity,
            notifyUrl: variables.payoutNotifyUrl,
            subBankName,
            remark,
            version: variables.apiVersion
        };

        validate(payoutRequest, payoutRules);

        const payoutTransfer = transformer({
            fields: payoutRequest,
            mapper: payoutMapper.payoutMapper,
            opts: ["-n", "-sm"]
        });

        delete payoutTransfer.remarks;

        

        const sign = await generateSignature(payoutTransfer);
        payoutTransfer.sign = sign;
        payoutTransfer.remarks = payoutRequest.productName;

        

        const payoutXMLResponse = await payoutTransaction(variables.walaopayPayoutUrl, payoutTransfer);
        const payoutJSONResponse = await xml2js.parseStringPromise(payoutXMLResponse);
        const payoutResponse = payoutJSONResponse.xml;

        if (!!payoutResponse.status) {
            const newPayoutResponse = {
                transactionStatus: responsePayoutStatus(payoutResponse.status[0]),
                amount: (payoutResponse.amount[0] / 100).toFixed(2),
                vendorOrderId: payoutResponse.partner_orderid[0],
                vendorReferenceId: payoutResponse.billno[0],
                currency: payoutResponse.currency[0],
                fee: payoutResponse.fee[0]
            }
            ctx.response.ok(newPayoutResponse, "Successfully initiated payout");
        }
        else if (!!payoutResponse.error_code && !!payoutResponse.error_description)
            ctx.response.badRequest(null, payoutResponse.error_description[0]);
        else {
            ctx.response.badRequest(null, "Something went wrong");
        }

    } catch (error) {
        errorResponseHandler(ctx, error);
    }
};
