import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark">
        <Link className="navbar-brand text-white" to="/">
          mBank
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item active">
              <Link className="nav-link text-white" to="/createUser">
                Create User
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/transferMoney">
                Transfer Money
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link text-white" to="/transactionHistory">
                Transaction History
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
