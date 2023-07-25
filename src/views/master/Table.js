import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { userList } from 'src/Redux/CreateUser/action';

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { toast } from 'react-toastify';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const Results = ({ className, userData, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const total = useSelector(state => state.user.total);
  const filters = useSelector(state => state.user.filters);
  const success = useSelector(state => state.IdentifyWaterSources.success);
  const errorMessage = useSelector(state => state.IdentifyWaterSources.error);
  const handleLimitChange = event => {
    filters['limit'] = event.target.value;
    dispatch(userList(filters));
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    filters['page'] = newPage + 1;
    dispatch(userList(filters));
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <div style={{ display: 'none' }}>
        {!success && success !== ''
          ? toast.error(errorMessage, { autoClose: 3000 })
          : ''}
      </div>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead style={{ backgroundColor: 'yellow' }}>
              <TableRow >
                <TableCell>id</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>createdAt</TableCell>
                <TableCell>UpdatedAt</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.data.data !== undefined && userData.data.data.length > 0
                ? userData.data.data.map(user => (
                    <TableRow hover key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {user.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.role_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.mobile}</TableCell>
                      <TableCell>
                        {moment(user.createdAt).format('DD-MM-YYYY')}
                      </TableCell>
                      <TableCell>
                        {moment(user.updatedAt).format('DD-MM-YYYY')}
                      </TableCell>
                    </TableRow>
                  ))
                : ''}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={total}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  //   userData: PropTypes.array.isRequired
};

export default Results;
