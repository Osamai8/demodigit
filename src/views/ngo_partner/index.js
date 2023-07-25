import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "src/components/Page";
import Results from "./Table";

export const NgoPartner = () => {
  const ngos = useSelector((state) => state.ngoPartner);
  const filters = useSelector((state) => state.ngoPartner.filters);
  const selectedIds = useSelector((state) => state.ngoPartner.selectedIds);


  return (
    <Page
      title="NGO"
      btnTitle="Add NGO"
      href="/app/ngo/create"
      downloadUrl="ngo_partner/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {ngos.isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <Results ngoPartnerData={ngos.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};
