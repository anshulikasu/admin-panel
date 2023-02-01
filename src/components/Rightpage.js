import React from "react";
import "./Rightpage.css";
import RightNavTop from "./RightNavTop";
import RightNavBottom from "./RightNavBottom";

function Rightpage() {
  return (
    <div className="right">
      <RightNavTop />
      <RightNavBottom />
    </div>
  );
}

export default Rightpage;
