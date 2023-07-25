import React from "react";
import "./index.css";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const SubDomain = () => {
  const subDomains = useSelector((state) => state.SubDomain);
  const filters = useSelector((state) => state.SubDomain.filters);
  const selectedIds = useSelector((state) => state.SubDomain.selectedIds);

  return (
    <Page
      title="Master/Sub Domain"
      btnTitle="Add Sub Domain"
      href="/app/sub_domain/create"
      downloadUrl="sub_domain/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {subDomains.isLoading ? (<CircularProgress className="commonLoader" />) : ("")}
      <Box>
        <DataTable data={subDomains.data.data} />
      </Box>
    </Page>
  );
};

export default SubDomain;
