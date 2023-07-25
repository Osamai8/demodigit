import { createStyles, makeStyles } from "@material-ui/core";
import theme from "src/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        backgroundColor: "#E4EDFF",
        height: "100%",
        width: "100%",
      },
      a: {
        textDecoration: "none",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      ".sort": {
        position: "relative",
        paddingRight: theme.spacing(3),
      },
      ".sort svg": {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
  })
);

const GlobalStyles = () => {
  useStyles();

  return <ToastContainer />;
};

export default GlobalStyles;
