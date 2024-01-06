import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from 'react-bootstrap/Badge';
import Cart from '../screens/Cart';
import Modal from '../Modal';
import { useCart } from "./ContextReducer";
function Navbar() {
  let data= useCart();
  const [cartview, setCartView] = useState(false);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  };
  const closeCart = () => {
    setCartView(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav me-auto mb-2">
              <li>
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authtoken") ? (
                <li>
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myOrder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : ( " " )}
            </ul>
            {(!localStorage.getItem("authtoken")) ? 
              <div className="d-felx">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
              </div>
             : 
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="btn bg-white text-success mx-2" onClick={()=>{setCartView(true)}}>
                My Cart{" "}
                <Badge pill bg="success">{data.length}</Badge>
                </div>
                {cartview ? <Modal onClose={closeCart}><Cart onClose={closeCart} /></Modal> : null}
                <div className="btn bg-white text-success mx-2" onClick={handlelogout}>Log Out</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
