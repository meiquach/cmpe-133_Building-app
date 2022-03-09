import React from "react";
import imageAbout from "./Pages/images/about-img.svg";

function About() {
  return (
    <section className="about" id="about">
      <h1 className="heading">
        <span>about</span> us
      </h1>
      <div className="row">
        <div className="image">
          <img src={imageAbout} />
        </div>
        <div className="content">
          <h3>Group Of Students At SJSU</h3>
          <a href="#" className="btn">
            learn more <span className="fas fa-chevron-right"></span>
          </a>
        </div>
      </div>
    </section>
  );
}
export default About;
