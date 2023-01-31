const db = require("../models/transaction");
const userAmount = require("../models/createUser");

exports.createTransaction = async (req, res) => {
  try {
    let { rName, sName, makeTransaction, balance } = req.body;
    console.log("hhhhhh")
    // check if the user amount exists
    let user = await userAmount.User.findOne({ email: req.body.email });
    console.log("user------->",user.amount,user)
    console.log("askdj", sName,rName,
    balance,
    makeTransaction,)
    if (user.amount < balance) {
      return res
        .status(401)
        .json({ errors: [{ msg: "Sorry! you have insufficient balance !" }] });
    } else {
      let newData = new db.Transaction({
        rName,
        sName,
        balance,
        makeTransaction,
      });
      newData = await newData.save();
   
      console.log(newData)
      userAmount.User.findOneAndUpdate(
        user.email ,
        { $set: { amount:makeTransaction-balance } },
     ).then((res)=>{
        console.log("res666666",res)

      })

    //   userAmount.User.findOneAndUpdate(
    //     rName ,
    //     { $set: { amount:user.amount+balance } },
    //  ).then((res)=>{
    //     console.log("res666666",res)

    //   })
 
     

  
      res.status(200).json({
        msg: "Transaction is created",
        status: true,
      });
    }
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message, status: false }] });
  }
};

exports.transactionList=async(req,res)=>{
  try {
    let transactionList = await db.Transaction.find({});
    if (!transactionList) {
      return res.status(401).json({ errors: [{ msg: "No transactionList Found!" }] });
    }
    res.status(200).json({
      transactionList: transactionList,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message, status: false }] });
  }
}
