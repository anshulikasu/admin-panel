import React, { useState, useEffect } from "react";
import "./RightNavTop.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import FaceIcon from "@mui/icons-material/Face";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { formHelperTextClasses } from "@mui/material";
import { TableRow } from "@material-ui/core";

const RightNavTop = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);

        setLoading(false);
      });
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  const styleForButton = {
    size: "7vh",
  };

  return (
    <Card className="card-one">
      <CardContent className="cardcontent-one">
        <Typography className="typo-subone">
          <FaceIcon style={styleForButton} />
          {data.data.totalInstall}
          <Typography className="typo-one">Total Installs</Typography>
        </Typography>

        {/* <Typography>{data.data.totalInstall}</Typography> */}
        <Typography className="typo-subone">
          <CircleIcon />
          {data.data.totaluninstall}
          <Typography variant="h2" component="h2" className="typo-one">
            Total Uninstall
          </Typography>
        </Typography>

        <Typography className="typo-subone">
          <CircleIcon />
          {data.data.activeinstall}
          <Typography variant="h2" component="h2" className="typo-one">
            Active Install
          </Typography>
        </Typography>
      </CardContent>
      <CardContent className="cardcontent-two">
        <Typography className="typo-subone">
          <ArrowDropDownCircleIcon />
          {data.data.aliveappusers}
          <Typography variant="h5" component="h2" className="typo-two">
            Alive AppUser
          </Typography>
        </Typography>

        <Typography className="typo-subone">
          <CircleIcon />
          {data.data.alivechurn}
          <Typography variant="h5" component="h2" className="typo-two">
            Alive Churn
          </Typography>
        </Typography>

        <Typography className="typo-subone">
          <CircleIcon />
          {data.data.churn}
          <Typography className="typo-two">Churn</Typography>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RightNavTop;
