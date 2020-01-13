"use strict";

const payoutRules = {
    amount: "required|decimal",
    currency: "required",
    merchantId: "required",
    vendorOrderId: "required",
    memberId: "required",
    accountName: "required",
    bankName: "required",
    accountNumber: "required",
    bankProvince: "required",
    bankCity: "required",
    subBankName: "required",
    notifyUrl: "required",
    remark: "required",
};
module.exports = payoutRules;