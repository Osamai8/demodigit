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
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: 313,
  },
  avatar: {
    color: "white",
    height: 51,
    width: 85,
  },
  differenceIcon: {
    color: colors.red[900],
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1),
  },
}));
const gradient = {
  height: "140px",
  width: "313px",
  backgroundColor: "#0B96D4",
  backgroundImage: `linear-gradient(to right,#F9AE15,#0B96D4)`,
  boxShadow: "0px 3px 6px #00000052",
};
const BlockCard = ({ className, ...rest }) => {
  const classes = useStyles();

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
              Blocks
            </Typography>
          </Grid>
          <Grid style={{ paddingRight: "50px" }} item>
            <Avatar
              variant="square"
              src="/Group 13540.svg"
              className={classes.avatar}
            ></Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

BlockCard.propTypes = {
  className: PropTypes.string,
};

export default BlockCard;
