import {
  Box,
  Card,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { mdiSort, mdiSortAscending, mdiSortDescending } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { rowsPerPageOptions } from "../../utils/halper";
import { isActionAuth } from "src/utils/sessionStorage";
import { userLevelListAction } from "src/Redux/UserLevel/action";

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));
const tableColumn = ["Id", "Name"];

const DataTable = ({ className, data, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  // const [max, setMax] = useState(2);

  const [sortVlaues, setSortValues] = useState({
    id: "",
  });

  const total = useSelector((state) => state.userLevelList.total);
  const filters = useSelector((state) => state.userLevelList.filters);

  const handleLimitChange = (event) => {
    filters["limit"] = event.target.value;
    dispatch(userLevelListAction(filters));
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    filters["page"] = newPage;
    dispatch(userLevelListAction(filters));
    setPage(newPage);
  };

  const sortData = (key) => {
    let value = sortVlaues[key];
    value = value === "" ? 1 : value * -1;
    let sortObj = {
      sortId: "id" === key ? value : "",
    };
    let newSortState = {};
    Object.keys(sortVlaues).forEach((key2) => {
      newSortState[key2] = key2 === key ? sortVlaues[key2] : "";
    });
    newSortState[key] = value;
    setSortValues(newSortState);
    dispatch(userLevelListAction({ ...sortObj, limit, page }));
  };

  useEffect(() => {
    if (filters?.page) {
      setPage(filters.page);
    }
  }, [filters]);

  const _pageAuthentication = [];
  // const _pageAuthentication = useSelector((state) => {
  //   return state.PageAuthentication.data.data;
  // });
  return (
    <Card className={clsx(classes.root, className)} {...rest} elevation={0}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table dense="true" size="small" table="true">
            <TableHead>
              <TableRow style={{ background: "#f9ae15" }}>
                {tableColumn.map((column, i) => {
                  let arr = ["id"];
                  let sortArr = ["Id"];
                  if (sortArr.includes(column)) {
                    let index = sortArr.findIndex((e) => e === column);
                    let value = sortVlaues[arr[index]];
                    let order = "";
                    if (value === "") {
                      order = mdiSort;
                    } else if (value === 1) {
                      order = mdiSortAscending;
                    } else {
                      order = mdiSortDescending;
                    }
                    return (
                      <TableCell
                        // className={sortClass}
                        onClick={() => sortData(arr[index])}
                        key={i}
                      >
                        <Box display="flex" alignItems="center">
                          {column}
                          {order && (
                            <Icon
                              style={{ marginLeft: "5px" }}
                              path={order}
                              size={0.8}
                              color="black"
                            />
                          )}
                        </Box>
                      </TableCell>
                    );
                  } else {
                    if (
                      isActionAuth("BLOCK", "UPDATE", _pageAuthentication) &&
                      isActionAuth("BLOCK", "DELETE", _pageAuthentication) &&
                      column === "Action"
                    ) {
                      return <TableCell key={i}>{column}</TableCell>;
                    } else {
                      return <TableCell key={i}>{column}</TableCell>;
                    }
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0
                ? data.map((singleData) => (
                  <TableRow key={singleData.id}>
                    <TableCell>{singleData.id}</TableCell>
                    <TableCell>{singleData.name}</TableCell>
                  </TableRow>
                ))
                : ""}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" alignItems="center" justifyContent="flex-end" mb={3}>
        <label>Rows per page:</label>
        <FormControl className={classes.formControl}>
          <Select
            style={{ width: 80, height: 40 }}
            value={limit}
            onChange={handleLimitChange}
          >
            {rowsPerPageOptions().map((e, i) => (
              <MenuItem key={i} value={e}>
                {e}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Pagination
          style={{ position: "relative" }}
          showFirstButton
          showLastButton
          count={Math.ceil(total / limit)}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
        />
      </Box>
    </Card>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  //   userData: PropTypes.array.isRequired
};

export default DataTable;
