import {
  Avatar,
  Card,
  CardContent,
  colors,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    width: 313,
  },
  avatar: {
    color: "white",
    height: 52,
    width: 52,
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
  height: "140px",
  width: "313px",
  backgroundColor: "#0B96D4",
  backgroundImage: `linear-gradient(to right,#9BD83F,#F9AE15)`,
  boxShadow: "0px 3px 6px #00000052",
};

const VillageCard = ({ className, ...rest }) => {
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
              Villages
            </Typography>
          </Grid>
          <Grid style={{ paddingRight: "50px" }} item>
            <Avatar
              variant="square"
              src="/Group 13572.svg"
              className={classes.avatar}
            ></Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

VillageCard.propTypes = {
  className: PropTypes.string,
};

export default VillageCard;
