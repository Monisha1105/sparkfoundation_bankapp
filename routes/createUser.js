var express = require("express");
var router = express.Router();

var { createUser,userList,userListOne } = require("../controllers/createUser");

router.post("/createUser", createUser);
router.get("/userList",userList)
router.get('/userlist/:id',userListOne);

module.exports = router;
