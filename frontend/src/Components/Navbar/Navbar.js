import React, { Component, useRef } from "react";
import { useContext } from "react";
import { MenuItems } from "./MenuItems";
import AuthContext from "../../context/AuthProvider";
import useLogout from "../../hooks/useLogout";
import { useNavigate, Link } from "react-router-dom";


const Navbar = () => {
  const { auth } = useContext(AuthContext);
  const logout = useLogout();
  const navigate = useNavigate();


  const signOut = async () => {
    await logout();
    navigate('/');
  }

  return (
    <header className="header">
      <div className="logo">
        <i className="fas fa-heartbeat"></i> Make-Med Sync
      </div>

      <nav className="navbar">
        <ul className="nav-menu">
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a href={item.url}>{item.title}</a>
              </li>
            );
          })}
          <li className="icons">
            <i className="fas fa-search" id="search-btn"></i>
          </li>
          <>
            {auth.email ? (
              <li className="icons">
                {auth.email}
                <button className="submit" onClick={signOut}>
                  Logout
                </button>
              </li>
            ) : (
              <Link to ="./auth" className="icons">
                <i className="fas fa-user" id="login-btn">
                  {" "}
                </i>{" "}
              </Link>
            )}{" "}
          </>
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
