const db = require("../models/createUser");

exports.createUser = async (req, res) => {
  try {
    let { name, email, amount } = req.body;
    // check if the user exists
    let user = await db.User.findOne({ email: email });
    if (user) {
      return res
        .status(401)
        .json({ errors: [{ msg: "User is Already Exists" }] });
    }
    // add
    let newUser = new db.User({
      name,
      email,
      amount,
    });
    newUser = await newUser.save();
    res.status(200).json({
      msg: "new User is created",
      status: true,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message, status: false }] });
  }
};

exports.userList = async (req, res) => {
  try {
    let users = await db.User.find({});
    if (!users) {
      return res.status(401).json({ errors: [{ msg: "No users Found!" }] });
    }
    res.status(200).json({
      users: users,
    });
  } catch (error) {
    res.status(500).json({ errors: [{ msg: error.message, status: false }] });
  }
};

exports.userListOne=async(req,res)=>{
  try{
    // var id=req.params.id
    let userId = req.params.id;
    let user = await db.User.findById(userId);
    if(!user){
        return res.status(401).json({errors : [{msg : 'No User Found!'}]})
    }
    res.status(200).json({
        user : user
    });

  }
  
  catch (error) {
    res.status(500).json({ errors: [{ msg: error.message, status: false }] });
  }
}
