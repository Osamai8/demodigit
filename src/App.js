import { ThemeProvider } from "@material-ui/core";
import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes } from "react-router-dom";
import GlobalStyles from "src/components/GlobalStyles";
import "src/mixins/chartjs";
import routes from "src/routes";
import theme from "src/theme";

const App = () => {
  const routing = useRoutes(routes);

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </div>
  );
};

export default App;
