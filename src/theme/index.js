import { colors } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import shadows from "./shadows";
import typography from "./typography";

const theme = createTheme({
  palette: {
    // background: {
    //   // dark: '#000',
    //   default: 'E4EDFF',
    //   paper: colors.common.white
    // },
    primary: {
      main: "#003CBF",
    },
    secondary: {
      main: "#ff9800",
    },
    success: {
      main: colors.green[500],
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
      success: colors.success,
    },
  },
  Toolbar: {
    background: colors.white,
  },
  shadows,
  typography,
});

export default theme;
