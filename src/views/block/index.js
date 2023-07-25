import React from "react";
import "./index.css";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const Block = () => {
  const blocks = useSelector((state) => state.Block);
  const filters = useSelector((state) => state.Block.filters);
  const selectedIds = useSelector((state) => state.Block.selectedIds);

  return (
    <Page
      title="Master/Block"
      btnTitle="Add Block"
      href="/app/block/create"
      downloadUrl="block/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {blocks?.isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <DataTable data={blocks.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};

export default Block;
