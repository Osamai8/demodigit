import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    // width: theme.spacing(3),
    height: theme.spacing(3),
    objectFit: "contain",
  },
  large: {
    // width: 54,
    height: 64,
    objectFit: "contain",
  },
  xl: {
    // width: 88,
    height: 88,
    objectFit: "contain",
  },
}));

const Logo = ({ size, variant, src }) => {
  const classes = useStyles();

  return (
    // <Avatar
    //   variant={variant ? variant : "square"}
    //   src={src}
    //   className={classes[size]}
    // />
    <img src={src} className={classes[size]} alt="Logo" />
  );
};

export default Logo;
