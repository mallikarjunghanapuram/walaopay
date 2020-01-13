"use strict";

const transactionMapper = require("../mappers/transaction");
const errorResponseHandler = require("../utilities/pc-helpers/errorResponseHandler");
const transactionQueryRules = require("../validation-rules/transactionQuery");
const { transformer } = require("../utilities/transformers");
const { validate } = require("../utilities/validator");
const { generateSignature } = require("../utilities/generateSignature");
const { getTransactionQuery } = require("../models/transactionQuery");
const { responseStatus, responsePayoutStatus } = require("../utilities/responseStatusFormatter");
const variables = require("../variables");
const xml2js = require('xml2js');
const util = require('util');

xml2js.parseStringPromise = util.promisify(xml2js.parseString);

exports.transactionDepositQuery = async function (ctx) {
    try {
        const transactionQueryRequest = ctx.request.body;
        validate(transactionQueryRequest, transactionQueryRules);
        transactionQueryRequest.amount = ((transactionQueryRequest.amount * 100).toString());
        const transactionQuery = transformer({
            fields: transactionQueryRequest,
            mapper: transactionMapper.transactionMapper,
            opts: ["-n", "-sm"]
        });

        const sign = await generateSignature(transactionQuery);
        transactionQuery.sign = sign;

        const transactionXMLResponse = await getTransactionQuery(variables.walaopayTransactionDepositQueryUrl, transactionQuery);
        const transactionsJSONResponse = await xml2js.parseStringPromise(transactionXMLResponse);
        const transactionResponse = transactionsJSONResponse.xml;

        if (!!transactionResponse.status) {
            const newTransactionResponse = {
                transactionStatus: transactionResponse.status[0],
                amount: (transactionResponse.amount[0] / 100).toFixed(2),
                vendorOrderId: transactionResponse.partner_orderid[0]
            }

            if (newTransactionResponse.transactionStatus === '000' ||
                newTransactionResponse.transactionStatus === '001' ||
                newTransactionResponse.transactionStatus === '111') {
                newTransactionResponse.transactionStatus = responseStatus(transactionResponse.status[0]);
                ctx.response.ok(newTransactionResponse, "Transaction details fetched successfully");
            } else {
                newTransactionResponse.transactionStatus = responseStatus(transactionResponse.status[0]);
                ctx.response.badRequest(newTransactionResponse, newTransactionResponse.transactionStatus);
            }
        } else {
            ctx.response.badRequest(null, "Something went wrong");
        }

    } catch (error) {
        errorResponseHandler(ctx, error);
    }
};

exports.transactionPayoutQuery = async function (ctx) {
    try {
        const transactionQueryRequest = ctx.request.body;
        validate(transactionQueryRequest, transactionQueryRules);
        transactionQueryRequest.amount = ((transactionQueryRequest.amount * 100).toString());
        const transactionQuery = transformer({
            fields: transactionQueryRequest,
            mapper: transactionMapper.transactionMapper,
            opts: ["-n", "-sm"]
        });

        const sign = await generateSignature(transactionQuery);
        transactionQuery.sign = sign;
        
        

        const transactionXMLResponse = await getTransactionQuery(variables.walaopayTransactionPayoutQueryUrl, transactionQuery);
        const transactionsJSONResponse = await xml2js.parseStringPromise(transactionXMLResponse);
        const transactionResponse = transactionsJSONResponse.xml;
        
        
        
        if (!!transactionResponse.status) {
            const newTransactionResponse = {
                transactionStatus: transactionResponse.status[0],
                amount: (transactionResponse.amount[0] / 100).toFixed(2),
                vendorOrderId: transactionResponse.partner_orderid[0]
            }

            if (newTransactionResponse.transactionStatus === '000' ||
                newTransactionResponse.transactionStatus === '001' ||
                newTransactionResponse.transactionStatus === '112' ||
                newTransactionResponse.transactionStatus === '111') {
                newTransactionResponse.transactionStatus = responsePayoutStatus(transactionResponse.status[0]);
                ctx.response.ok(newTransactionResponse, "Transaction details fetched successfully");
            } else {
                newTransactionResponse.transactionStatus = responsePayoutStatus(transactionResponse.status[0]);
                ctx.response.badRequest(null, newTransactionResponse.transactionStatus);
            }
        } else {
            ctx.response.badRequest(null, "Something went wrong");
        }

    } catch (error) {
        errorResponseHandler(ctx, error);
    }
};
