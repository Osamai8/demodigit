import React from "react";
import "./index.css";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const Stream = () => {
  const streams = useSelector((state) => state.Stream);
  const filters = useSelector((state) => state.Stream.filters);
  const selectedIds = useSelector((state) => state.Stream.selectedIds);

  return (
    <Page
      title="Master/Stream"
      btnTitle="Add Stream"
      href="/app/stream/create"
      downloadUrl="stream/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {streams.isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <DataTable data={streams.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};

export default Stream;
