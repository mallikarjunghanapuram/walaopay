"use strict";

const eBankTransferRules = {
    amount: "required|decimal",
    currency: "required",
    merchantId: "required",
    vendorOrderId: "required",
    returnUrl: "required",
    subIssuingBank: "required",
    memberId: "required",
    productName: "required",
};

module.exports = eBankTransferRules;