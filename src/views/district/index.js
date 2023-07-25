import React from "react";
import "./index.css";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const District = () => {
  const districts = useSelector((state) => state.District);
  const filters = useSelector((state) => state.District.filters);
  const selectedIds = useSelector((state) => state.District.selectedIds);

  return (
    <Page
      title="Master/District"
      btnTitle="Add District"
      href="/app/district/create"
      downloadUrl="district/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {districts?.isLoading && <CircularProgress className="commonLoader" />}
      <Box>
        <DataTable data={districts.data.data} className="commomPage" />
      </Box>
    </Page>
  );
};

export default District;
