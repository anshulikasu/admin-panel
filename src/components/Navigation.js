import React from "react";
import "./Navigation.css";
import SidebarRow from "../SidebarRow";
import { Link } from "react-router-dom";
import Logoheader from "./Logoheadre";
import PersonIcon from "@mui/icons-material/Person";

import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import CategoryIcon from "@mui/icons-material/Category";
import InfoIcon from "@mui/icons-material/Info";
import QuizIcon from "@mui/icons-material/Quiz";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import CircleIcon from "@mui/icons-material/Circle";

function Navigation() {
  return (
    <div className="sidebar-left">
      {/* <Logoheader /> */}
      <SidebarRow Icon={CircleIcon} title="WOW" />
      <SidebarRow selected Icon={DashboardCustomizeIcon} title="Dashboard" />

      <SidebarRow Icon={PersonIcon} title="Person" to="/person" />

      <SidebarRow Icon={VideoLibraryIcon} title="Video Clips" />
      <SidebarRow Icon={ReportProblemIcon} title="Report Problem" />
      <SidebarRow Icon={CategoryIcon} title="Category" />
      <SidebarRow Icon={InfoIcon} title="Info page" />
      <SidebarRow Icon={QuizIcon} title="Faq" />
      <SidebarRow Icon={NotificationsNoneIcon} title="Push notification" />
      <SidebarRow Icon={PersonAddAltIcon} title="Internal User" />
    </div>
  );
}

export default Navigation;
