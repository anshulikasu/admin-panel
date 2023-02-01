import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const RightNavTop = () => {
  const classes = useStyles();
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

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Total Installs
        </Typography>
        <Typography>{data.data.totalInstall}</Typography>
        <Typography variant="h5" component="h2">
          Total Uninstall
        </Typography>
        <Typography>{data.data.totaluninstall}</Typography>
        <Typography variant="h5" component="h2">
          Active Install
        </Typography>
        <Typography>{data.data.activeinstall}</Typography>

        <Typography variant="h5" component="h2">
          Alive AppUser
        </Typography>
        <Typography>{data.data.aliveappusers}</Typography>

        <Typography variant="h5" component="h2">
          Alive Churn
        </Typography>
        <Typography>{data.data.alivechurn}</Typography>
        <Typography variant="h5" component="h2">
          Churn
        </Typography>
        <Typography>{data.data.churn}</Typography>
      </CardContent>
    </Card>
  );
};

export default RightNavTop;
