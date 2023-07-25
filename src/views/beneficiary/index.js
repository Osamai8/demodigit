import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const Beneficiary = () => {
  const beneficiaries = useSelector((state) => state.beneficiary);
  const filters = useSelector((state) => state.beneficiary.filters);
  const selectedIds = useSelector((state) => state.beneficiary.selectedIds);

  return (
    <Page
      title="Beneficiary"
      btnTitle="Add Beneficiary"
      href="/app/beneficiary/create"
      downloadUrl="beneficiary/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {beneficiaries?.isLoading ? (<CircularProgress className="commonLoader" />) : ("")}
      <Box>
        <DataTable data={beneficiaries.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};

export default Beneficiary;
