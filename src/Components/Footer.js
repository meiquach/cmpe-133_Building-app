import {
  MenuItems,
  OurService,
  Contactinfo,
  FollowUS
} from "./Navbar/MenuItems";
import React from "react";

function Footer() {
  return (
    <section class="footer">
      <div class="box-container">
        <div class="box">
          <h3>quick links</h3>
          <ul className="list">
            {MenuItems.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {" "}
                    <i class="fas fa-chevron-right"></i>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div class="box">
          <h3>our services</h3>
          <ul className="list">
            {OurService.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {" "}
                    <i class="fas fa-chevron-right"></i>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div class="box">
          <h3>contact info</h3>
          <ul className="list">
            {Contactinfo.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {" "}
                    <i class="fas fa-chevron-right"></i>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div class="box">
          <h3>follow us</h3>
          <ul className="list">
            {FollowUS.map((item, index) => {
              return (
                <li key={index}>
                  <a className={item.cName} href={item.url}>
                    {" "}
                    <i class="fas fa-chevron-right"></i>
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div class="credit">
        {" "}
        created by <span> Team 24(cmpe 131) Fall2021 </span> | all rights
        reserved{" "}
      </div>
    </section>
  );
}

export default Footer;
