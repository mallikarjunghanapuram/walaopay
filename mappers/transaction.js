"use strict";

const transactionMapper = {
    version: "service_version",
    merchantId: "partner_code",
    vendorOrderId: "partner_orderid",
    memberId: "member_id",
    payIp: "member_ip",
    currency: "currency",
    amount: "amount",
    productName: "remarks",
    notifyUrl: "backend_url",
    returnUrl: "redirect_url",
    subIssuingBank: "bank_code",
};
module.exports = { transactionMapper };