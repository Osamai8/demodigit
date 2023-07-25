import React from "react";
import "./index.css";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const Domain = () => {
  const domains = useSelector((state) => state.Domain);
  const filters = useSelector((state) => state.Domain.filters);
  const selectedIds = useSelector((state) => state.Domain.selectedIds);


  return (
    <Page
      title="Master/Domain"
      btnTitle="Add Domain"
      href="/app/domain/create"
      downloadUrl="domain/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {domains.isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <DataTable data={domains.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};

export default Domain;
