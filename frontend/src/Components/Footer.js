import {
  MenuItems,
  OurService,
  Contactinfo,
  FollowUS
} from "./Navbar/MenuItems";
import React from "react";

function Footer() {
  return (
    <section className="footer">
      <div className="box-container">
        <div className="box">
          <h3>quick links</h3>
          <ul className="list">
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {" "}
                    <i className="fas fa-chevron-right"></i>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="box">
          <h3>our services</h3>
          <ul className="list">
            {OurService.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.url}>
                    {" "}
                    <i className="fas fa-chevron-right"></i>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="box">
          <h3>contact info</h3>
          <ul className="list">
            {Contactinfo.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.url}><i className={item.cName}>
                  </i>
                    {" "}
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="box">
          <h3>follow us</h3>
          <ul className="list">
            {FollowUS.map((item, index) => {
              return (
                <li key={index}>
                  <a href={item.url}> <i className={item.cName}>
                  </i>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="credit">
        {" "}
        created by <span> Team 7(cmpe 133) Spring2022 </span> | all rights
        reserved{" "}
      </div>
    </section>
  );
}

export default Footer;
