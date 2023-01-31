var express = require("express");
var router = express.Router();

var { createTransaction,transactionList } = require("../controllers/transactionApi");

router.post("/createTransaction", createTransaction);
router.get("/transactionList",transactionList)


module.exports = router;
