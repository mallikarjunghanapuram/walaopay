"use strict";

// WALAOPAY_DEPOSIT_API_URL
// WALAOPAY_PAYOUT_API_URL
const walaopaydepositAPI = process.env.WALAOPAY_DEPOSIT_API_URL;
const walaopaypayoutAPI = process.env.WALAOPAY_PAYOUT_API_URL;

//const walaopayAPIProxy = process.env.WALAOPAY_API_PROXY_URL;
//WALAOPAY_DEPOSIT_API_PROXY_URL
//WALAOPAY_PAYOUT_API_PROXY_URL
const walaopaydepositAPIProxy = process.env.WALAOPAY_DEPOSIT_API_PROXY_URL;
//const walaopaypayoutAPIProxy = process.env.WALAOPAY_PAYOUT_API_PROXY_URL;

//const walaopayCheckoutUrl = walaopayAPIProxy + process.env.WALAOPAY_CHECKOUT_URL;
const walaopayCheckoutUrl = walaopaydepositAPIProxy + process.env.WALAOPAY_CHECKOUT_URL;

const walaopayPrivateKeyLocation = process.env.WALAOPAY_PRIVATE_KEY;

const walaopayTransactionDepositQueryUrl = walaopaydepositAPI + process.env.WALAOPAY_TRANSACTION_DEPOSIT_QUERY_URL;
const walaopayTransactionPayoutQueryUrl = walaopaypayoutAPI + process.env.WALAOPAY_TRANSACTION_PAYOUT_QUERY_URL;

//const walaopayPayoutUrl = walaopayAPI + process.env.WALAOPAY_PAYOUT_URL;
const walaopayPayoutUrl = walaopaypayoutAPI + process.env.WALAOPAY_PAYOUT_URL;


const env = process.env.NODE_ENV || "development";
const host = process.env.APP_HOST || "localhost";
const port = process.env.APP_PORT || 1818;
const name = process.env.APP_NAME || "pm-walaopay-adapter";
const logLevel = process.env.LOG_LEVEL;
const awsRegion = process.env.AWS_REGION;
const payoutNotifyUrl = process.env.WALAOPAY_PAYOUT_NOTIFY_URL;
const notifyUrl = process.env.WALAOPAY_NOTIFY_URL;
const depositReturnUrl = process.env.WALAOPAY_DEPOSIT_RETURN_URL;
const apiVersion = process.env.WALAOPAY_API_VERSION;
const userId = process.env.WALAOPAY_USER_ID;

const variables = {
  env,
  host,
  logLevel,
  name,
  port,
  walaopayCheckoutUrl,
  walaopayPrivateKeyLocation,
  walaopayTransactionDepositQueryUrl,
  walaopayTransactionPayoutQueryUrl,
  awsRegion,
  notifyUrl,
  apiVersion,
  userId,
  walaopayPayoutUrl,
  payoutNotifyUrl,
  depositReturnUrl
};

module.exports = variables;
