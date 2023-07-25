import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const Languages = () => {
  const languages = useSelector((state) => state.languages);
  const filters = useSelector((state) => state.languages.filters);
  const selectedIds = useSelector((state) => state.languages.selectedIds);

  return (
    <Page
      title="Languages"
      btnTitle="Add Languages"
      href="/app/languages/create"
      downloadUrl="language/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {languages?.isLoading ? (<CircularProgress className="commonLoader" />) : ("")}
      <Box>
        <DataTable data={languages.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};

export default Languages;
