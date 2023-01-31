import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Createuser from "./components/Createuser";
import TransactionHistory from "./components/TransactionHistory";
import TransferMoney from "./components/TransferMoney";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/createUser" element={<Createuser />}></Route>
          <Route path="/transactionHistory" element={<TransactionHistory />}></Route>
          <Route path="/transferMoney" element={<TransferMoney />}></Route>
          <Route path="/transferMoney/:id" element={<UserDetails />}></Route>


        </Routes>
      </Router>
    </div>
  );
}

export default App;
