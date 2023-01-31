import  Axios  from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Createuser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  let navigate=useNavigate()

  const submit=(e)=>{
    e.preventDefault()
    var body={
      name:name,
      email:email,
      amount:amount
    }
    Axios.post('http://localhost:8000/api/createUser',body)
    .then((res)=>{
      console.log("res",res)
      toast.success("Saved succssfully");
      navigate('/transferMoney')
    })
    .catch((err)=>{
      console.log("err",err.response)
      alert(err.response.data.errors[0].msg)
    })
  }

  return (
  
    <div className="container text-center">
      <h5 className="text-black mt-5">CREATE YOUR ACCOUNT</h5>
      <div className="mt-3">
        <input
          type="text"
          name="name"
          value={name}
          className="form-control w-25"
          style={{margin:"auto"}}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter the Name"
        />
      </div>
      <div className="mt-3">
        <input
          type="text"
          name="email"
          value={email}
          className="form-control w-25"
          style={{margin:"auto"}}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter the Email"

        />
      </div>
      <div className="mt-3">
        <input
          type="text"
          name="amount"
          value={amount}
          className="form-control w-25"
          style={{margin:"auto"}}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter the Amount"

        />
      </div>
      <button className="btn-primary mt-3 w-25" onClick={submit}>Add</button>
    </div>

  );
};

export default Createuser;
