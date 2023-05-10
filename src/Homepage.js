import React from "react";
import "./Homepage.css";
import Sidenav from "./navigation/Sidenav";
import ImageUploader from "./timeline/Post/ImageUploader";
import Post from "./timeline/Post/Post";

function Homepage() {
  return (
    <div className="homepage">
      <div className="homepage__navWraper">
        <Sidenav />
      </div>
      <div className="homepage__timeline">
        {/* <Timeline /> */}
        <ImageUploader/>
        <Post/>
      </div>
    </div>
  );
}

export default Homepage;
