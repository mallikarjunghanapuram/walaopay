"use strict";

const payoutMapper = {
    version: "service_version",
    merchantId: "partner_code",
    vendorOrderId: "partner_orderid",
    memberId: "member_id",
    currency: "currency",
    amount: "amount",
    accountName: "account_name",
    accountNumber: "account_number",
    bankProvince: "bank_province",
    bankCity: "bank_city",
    subBankName: "bank_branch",
    bankName: "bank_code",
    notifyUrl: "notify_url",
    remark: "remarks"
};
module.exports = { payoutMapper };