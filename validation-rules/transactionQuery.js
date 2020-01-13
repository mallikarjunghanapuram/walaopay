"use strict";

const transactionQueryRules = {
    amount: "required|decimal",
    currency: "required",
    merchantId: "required",
    vendorOrderId: "required",
};

module.exports = transactionQueryRules;