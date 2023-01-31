require("dotenv").config();
const mongoose = require("mongoose");
var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
var Buffer = require('buffer/').Buffer 
// app.use(bodyParser.urlencoded({ extended: true }));
//  DATABASE=mongodb+srv://sridhar:sridhar@cluster0.9knrs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
console.log(Buffer.from("Hello World").toString('base64'));
console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'));
app.use(cors());
//DB Connection
mongoose
  .connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "hello world",
  });
});

//Routes

var userRoutes = require("./routes/createUser");
var transactionRoutes=require('./routes/transactionsApi');
app.use("/api", userRoutes);
app.use('/api',transactionRoutes);



//PORT
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
