var mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sName:{
    type:String,
    required:true
   },
   rName:{
    type:String,
    required:true
   },
    balance: {
    type: Number,
    required: true,
  },
  makeTransaction:{
    type: Number,
    required: true,
  }
},{timestamps:true});

exports.Transaction = mongoose.model("Transaction", transactionSchema);
