import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userList } from 'src/Redux/CreateUser/action';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Table';
import Toolbar from './Toolbar';
// import data from './data';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));
export const MasterList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userList({ page: 1 }));
  }, []);
  const data = useSelector(state => {
    return state.user;
  });
  return (
    <Page className={classes.root} title="Master List">
      <Container maxWidth={false}>
        <h1 className="Master__title">Master</h1>

        <Toolbar />

        <Box mt={3}>
          <Results userData={data} />
        </Box>
      </Container>
    </Page>
  );
};
