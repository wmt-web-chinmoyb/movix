import React from "react";
import ReactPlayer from "react-player/youtube";
import "./style.scss";
const VideoPopup = ({ show, videoId, setShow, setVideoId }) => {
  const hidePopup = () => {
    setShow(false);
    setVideoId(null);
  };
 
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
      <div className="opacityLayer"></div>
      <div className="videoPlayer">
        <span className="closeBtn" onClick={hidePopup}>
          X
        </span>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${videoId}`}
          controls
        />
      </div>
    </div>
  );
};

export default VideoPopup;
