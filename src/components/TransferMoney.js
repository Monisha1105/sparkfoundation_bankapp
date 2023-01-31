import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TransferMoney = () => {
  const [resData, setResData] = useState([]);
  let dataId = 1;
  let navigate = useNavigate();

  useEffect(() => {
    getUserList();
  }, []);
  const getUserList = () => {
    Axios.get("http://localhost:8000/api/userList")
      .then((res) => {
        // console.log("res",res.data.users)
        setResData(res.data.users);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  const handleClick = (id) => {
    navigate(`/transferMoney/${id}`);
  };

  return (
    <div className="text-center container">
      <h4 className="mt-4">Transfer Money</h4>
      <table className="table table-bordered table-dark mt-3">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Amount</th>
            <th>Operation</th>
          </tr>
        </thead>
        <tbody>
          {resData.length > 0 &&
            resData.map((data) => {
              return (
                <tr key={data._id}>
                  <td>{dataId++}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.amount}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClick(data._id)}
                    >
                      Payment
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TransferMoney;
