import React from "react";
import "./index.css";
import { Box, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";

const UserList = () => {
  const users = useSelector((state) => state.user);
  const filters = useSelector((state) => state.user.filters);
  const selectedIds = useSelector((state) => state.user.selectedIds);

  return (
    <Page
      title="User Management"
      btnTitle="Add User"
      href="/app/user_management/create"
      downloadUrl="user/csv"
      csvFilters={{ ...filters, id: selectedIds }}
    >
      {users?.isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <DataTable data={users.data.data} className="commonPage" />
      </Box>
    </Page>
  );
};

export default UserList;
