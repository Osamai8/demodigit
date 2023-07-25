import { Link } from "react-router-dom";
import React from "react";
import Page from "src/components/Page";
import "./index.css";

const Dashboard = () => {
  return (
    <Page title="Dashboard" downloadUrl="">
      <iframe src="https://stgsuperset.dhwaniris.in/login/?next=http://stgsuperset.dhwaniris.in/superset/dashboard/14/?native_filters_key%3DC5bDNW7ttVapZp-_7MWLTLvYrP1XrPbAxjWbvRxbFPO7ugCrxekNdYEMOlOq889u&standalone=true" style={{ height: "90vh", width: "100%" }} />

    </Page>
  );
};

export default Dashboard;
