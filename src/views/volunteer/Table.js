import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
// import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { Pagination } from "@material-ui/lab";
import { mdiSort, mdiSortAscending, mdiSortDescending } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  volunteerList,
  deleteData,
  volunteerSelectedAction,
} from "src/Redux/Volunteer/action";
import { rowsPerPageOptions } from "../../utils/halper";
import { isActionAuth } from "src/utils/sessionStorage";
import TableSearch from "src/components/TableSearch";
import { customAlert } from "../../utils/customAlert";
import Filter from "src/components/Filter";

const useStyles = makeStyles((theme) => ({
  avatar: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const tableColumn = [
  "First Name",
  "Last Name",
  "Email",
  "Mobile Number",
  "Action",
  "Status",
];

const Results = ({ className, volunteerData, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  // const [isViewForm, setViewForm] = useState(false);
  const [sortVlaues, setSortValues] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    email: "",
    is_deleted: "",
  });
  const [filters, setFilters] = useState({
    "first_name": "",
    "last_name": "",
    "email": "",
    "mobile_number": "",
    "is_deleted": "",
    "limit": ""
  });

  const total = useSelector((state) => state.volunteer.total);
  const isDeleted = useSelector((state) => state.volunteer.isDeleted);

  useEffect(() => {
    if (isDeleted) {
      dispatch(volunteerList({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [isDeleted, dispatch]);

  useEffect(() => {
    if (page) {
      dispatch(volunteerList({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [page])

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    if (page === 1) dispatch(volunteerList({ ...filters, limit: event.target.value, page: 1 }));
    else setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    filters["page"] = newPage;
    setPage(newPage);
  };

  const updateData = (id) => {
    navigate(`/app/volunteer/update/${id}`, { replace: true });
  };

  const handleStatus = (ids, isDeleted) => {
    let val = "0";
    isDeleted === "1" ? (val = "0") : (val = "1");
    customAlert("Are you sure you want to change it's status? ", () => {
      dispatch(deleteData({ id: ids, isDeleted: val }));
    });
  };

  const sortData = (key) => {
    let value = sortVlaues[key];
    value = value === "" ? 1 : value * -1;
    let sortObj = {
      sortFirstName: "first_name" === key ? value : "",
      sortLastName: "last_name" === key ? value : "",
      sortMobileNumber: "mobile_number" === key ? value : "",
      sortEmail: "email" === key ? value : "",
      sortIsDeleted: "is_deleted" === key ? value : "",
    };
    let newSortState = {};
    Object.keys(sortVlaues).forEach((key2) => {
      newSortState[key2] = key2 === key ? sortVlaues[key2] : "";
    });
    newSortState[key] = value;
    setSortValues(newSortState);
    dispatch(volunteerList({ ...sortObj, limit, page }));
  };

  useEffect(() => {
    if (filters?.page) {
      setPage(filters.page);
    }
  }, [filters]);


  const filterData = {
    onSubmit: (data) => {
      setFilters({ ...filters, ...data });
      if (page !== 1) setPage(1);
      else dispatch(volunteerList({ ...filters, ...data, page: 1, limit: filters.limit }));
    },
    onReset: () => resetFilterHandler(),
    fields: [
      { name: "first_name", type: "text", title: "First Name" },
      { name: "last_name", type: "text", title: "Last Name" },
      { name: "email", type: "text", title: "Email" },
      { name: "mobile_number", type: "number", title: "Mobile Number" },
      { name: "is_deleted", type: "select", title: "Status", optionsArray: [{ name: "Active", id: "1" }, { name: "Inactive", id: "0" }] },
    ],
  };

  const resetFilterHandler = () => {
    let clonedFilter = { ...filters };
    for (let elem in clonedFilter) clonedFilter[elem] = "";
    setFilters(clonedFilter);
    setLimit(10);
    if (page === 1) dispatch(volunteerList({ page: 1 }));
    else setPage(1);
  }

  useEffect(() => {
    dispatch(volunteerSelectedAction(selected));
  }, [selected, dispatch]);

  // ------------Related to Row selections-----------------//
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = volunteerData?.map((obj) => obj.id);
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

  const handleDeleteMultiple = () => {
    customAlert(
      `Are you sure you want to deactivate ${selected.length} selected items?`,
      () => dispatch(deleteData({ id: selected, isDeleted: "0" }))
    );
  };

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
            {selected.length > 0 && (
              <Button
                onClick={handleDeleteMultiple}
                variant="contained"
                color="primary"
                style={{ margin: "1rem" }}
                size="small"
              >
                Deactivate
              </Button>
            )}
            <Table dense="true" size="small" table="true">
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < volunteerData?.length
                      }
                      checked={
                        volunteerData?.length > 0 &&
                        selected.length === volunteerData?.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                  {tableColumn.map((column, i) => {
                    let dropdown = [
                      {
                        key: "is_deleted",
                        list: [
                          { name: "Active", id: "1" },
                          { name: "Inactive", id: "0" },
                        ],
                      },
                    ];
                    let arr = [
                      "first_name",
                      "last_name",
                      "email",
                      "mobile_number",
                      "is_deleted",
                    ];
                    let sortArr = [
                      "First Name",
                      "Last Name",
                      "Email",
                      "Mobile Number",
                      "Status",
                    ];
                    let index = sortArr.findIndex((e) => e === column);
                    if (sortArr.includes(column)) {
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
                          <Box
                            display="flex"
                            alignItems="center"
                            onClick={() => sortData(arr[index])}
                          >
                            {column}
                            {order && (
                              <Icon
                                className="cellFilterIcon"
                                path={order}
                                size={0.8}
                                color="black"
                              />
                            )}
                          </Box>
                          {/* <TableSearch
                            column={arr[index]}
                            onChange={searchData}
                            dropdown={dropdown}
                          /> */}
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
                      } else if (column === "Status") {
                        return (
                          <TableCell className="tableCell" key={i}>
                            {column}
                            {/* <TableSearch
                              column={arr[index]}
                              onChange={searchData}
                              dropdown={dropdown}
                            /> */}
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
                {volunteerData && volunteerData.length > 0
                  ? volunteerData.map((singleData) => {
                    const isItemSelected = isSelected(singleData.id);
                    return (
                      <TableRow hover key={singleData.id}>
                        <TableCell padding="checkbox" selected={isItemSelected}>
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onChange={(e) => handleRowClick(e, singleData.id)}
                            inputProps={{
                              "aria-label": "select all desserts",
                            }}
                          />
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.first_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.last_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.email}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.mobile_number}
                        </TableCell>
                        {isActionAuth("STATE", "CREATE", _pageAuthentication) &&
                          isActionAuth(
                            "STATE",
                            "DELETE",
                            _pageAuthentication
                          ) && (
                            <TableCell>
                              <div className="switchWrapper">
                                {isActionAuth(
                                  "STATE",
                                  "DELETE",
                                  _pageAuthentication
                                ) && (
                                    <VisibilityIcon
                                      className="cellViewBtn"
                                      onClick={() =>
                                        navigate(
                                          `/app/volunteer/view/${singleData.id}`
                                        )
                                      }
                                    />
                                  )}

                                {isActionAuth(
                                  "STATE",
                                  "CREATE",
                                  _pageAuthentication
                                ) && (
                                    <EditIcon
                                      className="cellEditBtn"
                                      onClick={() => updateData(singleData.id)}
                                    />
                                  )}
                              </div>
                            </TableCell>
                          )}
                        <TableCell>
                          <div className="switchWrapper">
                            <Switch
                              checked={Number(singleData.is_deleted)}
                              onChange={() =>
                                handleStatus(
                                  [singleData.id],
                                  singleData.is_deleted
                                )
                              }
                              size="small"
                              color="primary"
                              inputProps={{ "aria-label": "primary checkbox" }}
                            />
                            {Boolean(Number(singleData.is_deleted))
                              ? "Active"
                              : "Inactive"}
                          </div>
                        </TableCell>
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
        {/* </div> */}
      </Card>
    </Box>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  //   userData: PropTypes.array.isRequired
};

export default Results;
