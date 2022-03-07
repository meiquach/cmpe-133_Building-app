import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";

class Navbar extends Component {
  render() {
    return (
      <header className="header">
        <a href="#" className="logo">
          <i className="fas fa-heartbeat"></i> Make-Med Sync{" "}
        </a>
        <nav className="navbar">
          <ul className="nav-menu">
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="icons">
          <i className="fas fa-search" id="search-btn"></i>
          <i className="fas fa-user" id="login-btn"></i>
        </div>
      </header>
    );
  }
}
export default Navbar;
