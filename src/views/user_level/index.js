import React, { useEffect } from "react";
import "./index.css";
import {
  Box,
  CircularProgress,
  Container,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import Page from "../../components/Page";
import DataTable from "./Table";
import { userLevelListAction } from "src/Redux/UserLevel/action";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
}));

const UserLevelList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const userLevels = useSelector((state) => state.userLevelList);

  useEffect(() => {
    dispatch(userLevelListAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page className={classes.root} title="User Level">
      <Container maxWidth={false}>
        <h3 className="page-title">User Level</h3>

        {userLevels?.loading ? (
          <CircularProgress />
        ) : (
          <Box mt={3}>
            <DataTable data={userLevels.data.data} />
          </Box>
        )}
      </Container>
    </Page>
  );
};

export default UserLevelList;
