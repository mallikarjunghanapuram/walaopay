"use strict";

const Router = require("koa-router");

const eBankTransferController = require("./controllers/eBankTransfer");
const transactionQueryController = require("./controllers/transactionQuery");
const payoutController = require("./controllers/payout");

const health = require("./controllers/health");

const router = new Router();

router.post("/bank-transfer", eBankTransferController.eBankTransfer);
router.post("/transactions-deposit", transactionQueryController.transactionDepositQuery);
router.post("/transactions-payout", transactionQueryController.transactionPayoutQuery);
router.post("/payout", payoutController.payout);
router.get("/health", health.check);

module.exports = router;