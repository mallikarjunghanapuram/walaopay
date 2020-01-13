"use strict";

const transactionMapper = require("../mappers/transaction");
const errorResponseHandler = require("../utilities/pc-helpers/errorResponseHandler");
const eBankTransferRules = require("../validation-rules/eBankTransfer");
const { transformer } = require("../utilities/transformers");
const { validate } = require("../utilities/validator");
const { generateSignature } = require("../utilities/generateSignature");
const { gateWayHandler } = require("../models/eBankTransfer")
const variables = require("../variables");


exports.eBankTransfer = async function (ctx) {
    try {
        const eBankTransferRequest = ctx.request.body;
        eBankTransferRequest.version = variables.apiVersion;
        eBankTransferRequest.notifyUrl = variables.notifyUrl;
        eBankTransferRequest.returnUrl = variables.depositReturnUrl;
        eBankTransferRequest.memberId = variables.userId;
        validate(eBankTransferRequest, eBankTransferRules);

        eBankTransferRequest.amount =  ((eBankTransferRequest.amount*100).toString());

        const eBankTransfer = transformer({
            fields: eBankTransferRequest,
            mapper: transactionMapper.transactionMapper,
            opts: ["-n", "-sm"]
        });

        

        const remarks = eBankTransfer.remarks;
        delete eBankTransfer.remarks;

        const sign = await generateSignature(eBankTransfer);
        eBankTransfer.sign = sign;

        
        
        eBankTransfer.remarks = remarks;

        const title = 'Redirecting...Please wait...';
        const actionURL = variables.walaopayCheckoutUrl;
        

        await ctx.render('redirectform', {
            title,
            actionURL,
            method: 'POST',
            data: eBankTransfer
        });

    } catch (error) {
        errorResponseHandler(ctx, error);
    }
};