import React from "react";
import image1 from "./Videos/images/blog-1.JPG";
import image2 from "./Videos/images/blog-2.jpg";
import image3 from "./Videos/images/blog-3.jpg";

export default function Blog() {
  return (
    <section className="blogs" id="blogs">
      <h1 className="heading">
        {" "}
        our <span> blogs </span>{" "}
      </h1>

      <div className="box-container">
        <div className="box">
          <div className="image">
            <img src={image1} />
          </div>
          <div className="content">
            <div className="icon">
              <a href="#">
                {" "}
                <i className="fas fa-calendar"> </i> 31th Dec, 2021{" "}
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-user"> </i> by admin{" "}
              </a>
            </div>
            <h3>5 ways to keep yourself safe during a pandemic</h3>
            <p>
              I'ts more important than ever before to keep yourself safe with
              the course of the COVID-19 pandemic. Keep yourself safe with these
              methods
            </p>
            <a href="#" className="btn">
              {" "}
              learn more <span className="fas fa-chevron-right"></span>{" "}
            </a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src={image2} />
          </div>
          <div className="content">
            <div className="icon">
              <a href="#">
                {" "}
                <i className="fas fa-calendar"></i> 28th Nov, 2021{" "}
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-user"></i> by admin{" "}
              </a>
            </div>
            <h3>Avoiding the Flu</h3>
            <p>
              It's officially the start of the flu season! Time to take your
              annual flu shot and keep yourself safe.
            </p>
            <a href="#" className="btn">
              {" "}
              learn more <span className="fas fa-chevron-right"></span>{" "}
            </a>
          </div>
        </div>

        <div className="box">
          <div className="image">
            <img src={image3} />
          </div>
          <div className="content">
            <div className="icon">
              <a href="#">
                {" "}
                <i className="fas fa-calendar"></i> 31th Oct, 2021{" "}
              </a>
              <a href="#">
                {" "}
                <i className="fas fa-user"></i> by admin{" "}
              </a>
            </div>
            <h3>A Proactive Health Diet</h3>
            <p>
              Maintain your health with these easy tricks to a healthy and fun
              diet
            </p>
            <a href="#" className="btn">
              {" "}
              learn more <span className="fas fa-chevron-right"></span>{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
