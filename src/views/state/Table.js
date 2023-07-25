import {
  Box,
  Card,
  Checkbox,
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
// import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Pagination } from "@material-ui/lab";
import { mdiSort, mdiSortAscending, mdiSortDescending } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  StateList,
  // deleteData,
  stateSelectedAction,
} from "src/Redux/State/action";
import { fetchApi, rowsPerPageOptions } from "../../utils/halper";
import { isActionAuth } from "src/utils/sessionStorage";
import Filter from "src/components/Filter";
// import { customAlert } from "src/utils/customAlert";

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
const tableColumn = ["State Name", "Created At", "Updated At", "Action"];

const Results = ({ className, StateData, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const [sortVlaues, setSortValues] = useState({
    name: "",
    created_at: "",
    updated_at: "",
  });
  const [filters, setFilters] = useState({
    "state_id": "",
    "limit": ""
  });
  const [stateList, setStateList] = useState([]);

  const total = useSelector((state) => state.State.total);
  // const filters = useSelector((state) => state.State.filters);
  const isDeleted = useSelector((state) => state.State.isDeleted);

  useEffect(() => {
    if (isDeleted) {
      dispatch(StateList({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [isDeleted, dispatch]);

  useEffect(() => {
    if (page) {
      dispatch(StateList({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [page]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    if (page === 1) dispatch(StateList({ ...filters, limit: event.target.value, page: 1 }));
    else setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    filters["page"] = newPage;
    setPage(newPage);
  };

  useEffect(() => {
    fetchApi("state/list", setStateList, { fetched: "All" })
  }, []);

  // const updateData = (id) => {
  //   navigate(`/app/state/update/${id}`);
  // };

  const sortData = (key) => {
    let value = sortVlaues[key];
    value = value === "" ? 1 : value * -1;
    let sortObj = {
      sortName: "name" === key ? value : "",
      sortCreatedAt: "created_at" === key ? value : "",
      sortUpdatedAt: "updated_at" === key ? value : "",
    };
    let newSortState = {};
    Object.keys(sortVlaues).forEach((key2) => {
      newSortState[key2] = key2 === key ? sortVlaues[key2] : "";
    });
    newSortState[key] = value;
    setSortValues(newSortState);
    dispatch(StateList({ ...sortObj, limit, page }));
  };


  // const searchData = (e) => {
  //   setPage(1);
  //   filters["page"] = 1;
  //   filters[e.target.name] = e.target.value;
  //   dispatch(StateList(filters));
  // };

  useEffect(() => {
    dispatch(stateSelectedAction(selected));
  }, [selected, dispatch]);


  const filterData = {
    onSubmit: (data) => {
      setFilters({ ...filters, ...data });
      if (page !== 1) setPage(1);
      else dispatch(StateList({ ...filters, ...data, page: 1, limit: filters.limit }));
    },
    onReset: () => resetFilterHandler(),
    fields: [
      { name: "state_id", type: "select", title: "State ", optionsArray: stateList, }
    ],
  };

  const resetFilterHandler = () => {
    let clonedFilter = { ...filters };
    for (let elem in clonedFilter) clonedFilter[elem] = "";
    setFilters(clonedFilter);
    setLimit(10);
    if (page === 1) dispatch(StateList({ page: 1 }));
    else setPage(1);
  }

  // ------------Related to Row selections-----------------//
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = StateData.map((obj) => obj.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const isSelected = (keyword) => selected.indexOf(keyword) !== -1;

  const handleRowClick = (event, key) => {
    const selectedIndex = selected.indexOf(key);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  // const handleDeleteMultiple = () => {
  //   customAlert(
  //     `Are you sure you want to delete ${selected.length} selected items?`,
  //     () => dispatch(deleteData(selected))
  //   );
  // };

  // const handleDelete = (ids) => {
  //   customAlert("Are you sure you want to delete this?", () =>
  //     dispatch(deleteData(ids))
  //   );
  // };
  // ------------Related to Row selections-----------------//

  const _pageAuthentication = [];
  return (
    <Box>
      {filterData && <div className="filter">
        <Filter filterData={filterData} />
      </div>}

      <Card className={clsx(classes.root, className)} {...rest} elevation={0}>
        <PerfectScrollbar>
          <Box minWidth={1050}>
            {/* {selected.length > 0 && (
            <Button
              onClick={handleDeleteMultiple}
              variant="contained"
              color="primary"
              style={{ margin: "1rem" }}
            >
              Delete
            </Button>
          )} */}
            <Table dense="true" size="small" table="true">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 && selected.length < StateData?.length
                      }
                      checked={
                        StateData?.length > 0 &&
                        selected.length === StateData?.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                  {tableColumn.map((column, i) => {
                    let arr = ["name", "created_at", "updated_at"];
                    let sortArr = ["State Name", "Created At", "Updated At"];
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
                        <TableCell className="tableCell" key={i}>
                          <Box onClick={() => sortData(arr[index])}>
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
                        isActionAuth("STATE", "UPDATE", _pageAuthentication) &&
                        isActionAuth("STATE", "DELETE", _pageAuthentication) &&
                        column === "Action"
                      ) {
                        return (
                          <TableCell className="tableCell" key={i}>
                            {column}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell className="tableCell" key={i}>
                            {column}
                          </TableCell>
                        );
                      }
                    }
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {StateData && StateData.length > 0
                  ? StateData.map((singleData) => {
                    const isItemSelected = isSelected(singleData.id);
                    console.log(singleData);
                    return (
                      <TableRow hover key={singleData.id}>
                        <TableCell padding="checkbox" selected={isItemSelected}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={(e) => handleRowClick(e, singleData.id)}
                            inputProps={{ "aria-label": "select all desserts" }}
                          />
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {moment(singleData.created_at).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell className="tableCell">
                          {moment(singleData.updated_at).format("DD-MM-YYYY")}
                        </TableCell>
                        {isActionAuth("STATE", "CREATE", _pageAuthentication) &&
                          isActionAuth(
                            "STATE",
                            "DELETE",
                            _pageAuthentication
                          ) && (
                            <TableCell className="tableCell">
                              {isActionAuth(
                                "STATE",
                                "DELETE",
                                _pageAuthentication
                              ) && (
                                  <VisibilityIcon
                                    className="cellViewBtn"
                                    onClick={() =>
                                      navigate(`/app/state/view/${singleData.id}`)
                                    }
                                  />
                                )}

                              {/* {isActionAuth(
                                "STATE",
                                "CREATE",
                                _pageAuthentication
                              ) && (
                                <EditIcon
                                  className="cellEditBtn"
                                  onClick={() => updateData(singleData.id)}
                                />
                              )}
                              {isActionAuth(
                                "STATE",
                                "DELETE",
                                _pageAuthentication
                              ) && (
                                <DeleteIcon
                                  className="cellDeleteBtn"
                                  onClick={() => handleDelete([singleData.id])}
                                />
                              )} */}
                            </TableCell>
                          )}
                      </TableRow>
                    );
                  })
                  : (<TableRow><TableCell colSpan={12}>No Data Found!</TableCell></TableRow>)}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <Box display="flex" style={{ "display": total > 10 ? "" : "none" }} alignItems="center" justifyContent="flex-end" >
          <label>Rows per page:</label>
          <FormControl className={classes.formControl}>
            <Select
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
    </Box>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  //   userData: PropTypes.array.isRequired
};

export default Results;
