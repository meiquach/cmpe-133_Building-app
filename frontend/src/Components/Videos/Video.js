import React from "react";

function Video({ src }) {
  return (
    <>
      <div className="video-container">
        <video src={src} muted autoPlay loop></video>
      </div>
    </>
  );
}
export default Video;
