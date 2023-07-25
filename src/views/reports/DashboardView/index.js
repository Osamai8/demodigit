import React from "react";
import Page from "src/components/Page";
import "./index.css";

const Dashboard = () => {
  return (
    <Page title="Dashboard">
      <div className="dashboardCards">
        <ul>
          <li>
            <h1>24</h1>
            <p>States</p>
          </li>
          <li>
            <h1>24</h1>
            <p>Districts</p>
          </li>
          <li>
            <h1>24</h1>
            <p>Blocks</p>
          </li>
          <li>
            <h1>24</h1>
            <p>Gram Panchayat</p>
          </li>
          <li>
            <h1>24</h1>
            <p>Villages</p>
          </li>
        </ul>
      </div>
    </Page>
  );
};

export default Dashboard;
