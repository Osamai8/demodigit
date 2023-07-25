import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles,
} from "@material-ui/core";
import { Navigate } from "react-router";
import { getToken } from "src/utils/sessionStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: 313,
  },
  avatar: {
    color: "white",
    height: 46,
    width: 54,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
  media: {
    width: "100%",
    height: 140,
  },
}));
const gradient = {
  // background: 'rgb(155, 216, 63)',
  height: "140px",
  width: "313px",
  backgroundColor: "#0B96D4",
  backgroundImage: `linear-gradient(to right,#0B96D4,#9BD83F)`,
  boxShadow: "0px 3px 6px #00000052",
};
const GrampanchayatCard = ({ className, ...rest }) => {
  const classes = useStyles();

  if (getToken() === "") {
    <Navigate to="/login" />;
  }
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent style={gradient}>
        <Grid
          style={{ paddingTop: "20px" }}
          container
          justifyContent="space-between"
          spacing={3}
        >
          <Grid style={{ paddingLeft: "30px" }} item>
            <Typography
              style={{ color: "white", marginBottom: "8px" }}
              variant="h1"
            >
              0
            </Typography>
            <Typography color="textPrimary" gutterBottom variant="h5">
              Grampanchayats
            </Typography>
          </Grid>
          <Grid style={{ paddingRight: "50px" }} item>
            <Avatar
              variant="square"
              src="/Group 13547.svg"
              className={classes.avatar}
            ></Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

GrampanchayatCard.propTypes = {
  className: PropTypes.string,
};

export default GrampanchayatCard;
