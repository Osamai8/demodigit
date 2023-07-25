import React from "react";
import "./index.css";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const Campaign = () => {
  const campaigns = useSelector((state) => state.campaign);
  const filters = useSelector((state) => state.campaign.filters);
  const selectedIds = useSelector((state) => state.campaign.selectedIds);

  return (
    <Page
      title="Campaign"
      btnTitle="Add Campaign"
      href="/app/campaign/create"
      downloadUrl="campaign/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {campaigns?.isLoading && <CircularProgress className="commonLoader" />}
      <Box>
        <DataTable campaignData={campaigns.data} className="commonPage" />
      </Box>
    </Page>
  );
};

export default Campaign;
