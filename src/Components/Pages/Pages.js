import React, { useState } from "react";
import Video from "./Video";
import video2 from "./images/vid-2.mp4";
import video3 from "./images/vid-3.mp4";
import video5 from "./images/vid-5.mp4";

function Pages() {
  const [video, setVideo] = useState(video2);
  const [actives, setActives] = useState(["active", null, null]);

  const videos = [video2, video3, video5];

  const handleButtonClick = (index) => {
    const newActives = [null, null, null];
    newActives[index] = "active";
    setActives(newActives);
    setVideo(videos[index]);
  };

  return (
    <section className="home" id="home">
      <div className="content">
        <h3>Health is the real wealth</h3>
        <p>Health is precious – Protect it</p>
        <a href="123" className="btn">
          Explore more
        </a>
      </div>

      <div className="controls">
        {[0, 1, 2].map((index) => {
          return (
            <button
              key={index}
              className={`vid-btn ${actives[index]}`}
              onClick={() => handleButtonClick(index)}
            ></button>
          );
        })}
      </div>

      <Video src={video} />
    </section>
  );
}
export default Pages;
