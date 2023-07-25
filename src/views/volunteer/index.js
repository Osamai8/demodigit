import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "src/components/Page";
import Results from "./Table";

export const Volunteer = () => {

  const volunteers = useSelector((state) => state.volunteer);
  const filters = useSelector((state) => state.volunteer.filters);
  const selectedIds = useSelector((state) => state.volunteer.selectedIds);

  return (
    <Page
      title="Volunteer"
      btnTitle="Add Volunteer"
      href="/app/volunteer/create"
      downloadUrl="volunteer/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {volunteers.isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <Results volunteerData={volunteers?.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};
