import  Axios  from 'axios';
import React,{useState,useEffect} from 'react'

const TransactionHistory = () => {
  const [resData, setResData] = useState([]);
  let dataId = 1;

  const getUserList = () => {
    Axios.get("http://localhost:8000/api/transactionList")
      .then((res) => {
        // console.log("res",res.data.users)
        setResData(res.data.transactionList);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);
  return (
    <div className="text-center container">
    <h4 className="mt-4">Transaction History</h4>
    <table className="table table-bordered table-dark mt-3">
      <thead>
        <tr>
          <th>Id</th>
          <th>Sender</th>
          <th>Receiver</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {resData.length > 0 &&
          resData.map((data) => {
            return (
              <tr key={data._id}>
                <td>{dataId++}</td>
                <td>{data.sName}</td>
                <td>{data.rName}</td>
                <td>{data.balance
                }</td>
                <td>
                {data?.createdAt?.split('T')[0]}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
  )
}

export default TransactionHistory