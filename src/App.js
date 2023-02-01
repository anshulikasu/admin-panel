import "./App.css";
import React from "react";
import Navigation from "./components/Navigation";

import Rightpage from "./components/Rightpage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Rightpage />
      {/* <div className="side-nav">
        <Link to="/dashboard">
          <DashboardOutlined />
          Dashboard
        </Link>
        <Link to="/users">
          <UserOutlined />
          Users
        </Link>
        <Link to="/video-clips">
          <VideoCameraOutlined />
          Video Clips
        </Link>
        <Link to="/reported-contents">
          <FlagOutlined />
          Reported Contents
        </Link>
        <Link to="/category">
          <FolderOutlined />
          Category
        </Link>
        <Link to="/info-page">
          <InfoCircleOutlined />
          Info Page
        </Link>
        <Link to="/faq">
          <QuestionCircleOutlined />
          FAQ
        </Link>
        <Link to="/push-notifications">
          <BellOutlined />
          Push Notifications
        </Link>
        <Link to="/internal-users">
          <UsergroupAddOutlined />
          Internal Users
        </Link>
      </div> */}
    </div>
  );
}

export default App;
