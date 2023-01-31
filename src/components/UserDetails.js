import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserDetails = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [resData, setResData] = useState([]);
  const [balance, setBalance] = useState();
  const [makeTransaction, setMakeTransaction] = useState();
  const [rName,setRname]=useState('')
  const [rEmail,setRemail]=useState('')

  let navigate=useNavigate()

  let id = useParams();
  let dataId = 1;

  useEffect(() => {
    getUserList();
  }, []);
  const getUserList = () => {
    Axios.get("http://localhost:8000/api/userList")
      .then((res) => {
        if(id){
          const preData=res.data.users.filter((el)=>{
            return el._id !==id.id
          })
          setResData(preData);

        }
        else {
          setResData(res.data.users);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    getUsersDetails();
  }, []);

  const getUsersDetails = () => {
    Axios.get(`http://localhost:8000/api/userList/${id.id}`)
      .then((res) => {
        console.log("res---->", res.data.user.name);

        setName(res.data.user.name);
        setEmail(res.data.user.email);
        setAmount(res.data.user.amount);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleAmount = (e) => {
    console.log("e----------->",e.target.value,resData)
    setMakeTransaction(e.target.value);
    const rName=resData.filter((el)=>{
      return el.amount ==e.target.value
    })
    console.log("rName",rName)
    const checkEmail=resData.filter((el)=>{
      return el.amount ==e.target.value
    })
    console.log("chekEmail",checkEmail)
    setRname(rName[0]?.name)
    setRemail(checkEmail[0]?.email)
    
  };

  const transferButton = () => {
    let body = {
      sName:name,
      rName:rName,
      makeTransaction: makeTransaction,
      balance: balance,
      remail:rEmail,
      email:email
    };
    console.log("body", body);
    Axios.post('http://localhost:8000/api/createTransaction',body)
    .then((res)=>{
      // console.log("res",res)
      toast(res.data.msg);
      navigate('/transactionHistory')
    })
    .catch((err)=>{
      // console.log("err",err?.response?.data?.errors[0]?.msg)
      // toast.error(err.response.data.errors[0].msg);
      alert(err.response.data.errors[0].msg)
    })
    setEmail('')
    setAmount('')
    setRemail('')
    setBalance('')
    setMakeTransaction('')
    setRname('')
  };

  return (
    <div>
      <div className="container">
        <h4 className="text-center mt-4">Transaction </h4>
        <table className="table table-bordered table-dark mt-3">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{dataId++}</td>
              <td>{name}</td>
              <td>{email}</td>
              <td>{amount}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-5">
          <label>Make Transactions: </label>

          <select
            className="form-control"
            name="makeTransaction"
            onChange={handleAmount}
            value={makeTransaction}
          >
            <option>Select</option>

            {resData.length > 0 &&
              resData.map((data) => {
                return (
                  <option value={data.amount} key={data._id}>
                    {data.name} (Balance:{data.amount})
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mt-3">
          <label>Amount</label>
          <input
            type="number"
            className="form-control"
            value={balance}
            name="balance"
            onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <button
            className="btn-primary form-control w-25"
            onClick={transferButton}
          >
            Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
