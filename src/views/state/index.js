import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "src/components/Page";
import Results from "./Table";

export const State = () => {
  const states = useSelector((state) => state.State);
  const isLoading = useSelector((state) => state.State.isLoading);
  const filters = useSelector((state) => state.State.filters);
  const selectedIds = useSelector((state) => state.State.selectedIds);


  return (
    <Page
      title="Master/State"
      btnTitle="Add State"
      href="/app/state/create"
      downloadUrl="state/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <Results StateData={states.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};
