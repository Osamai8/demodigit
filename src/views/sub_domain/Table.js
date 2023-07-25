import {
  Box,
  Button,
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
  Switch,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";
// import DeleteIcon from "@material-ui/icons/Delete";
import { Pagination } from "@material-ui/lab";
import { mdiSort, mdiSortAscending, mdiSortDescending } from "@mdi/js";
import Icon from "@mdi/react";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { rowsPerPageOptions } from "../../utils/halper";
import { isActionAuth } from "src/utils/sessionStorage";
import {
  subDomainDeleteAction,
  subDomainListAction,
  subDomainSelectedAction,
} from "src/Redux/SubDomain/action";
import { customAlert } from "src/utils/customAlert";
import moment from "moment";
import Filter from "src/components/Filter";

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
const tableColumn = [
  "Subdomain Name",
  "Domain Name",
  "Created At",
  "Updated At",
  "Action",
  "Status",
];

const DataTable = ({ className, data, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const [sortVlaues, setSortValues] = useState({
    name: "",
    domain_name: "",
    created_at: "",
    updated_at: "",
    is_deleted: "",
  });
  const [filters, setFilters] = useState({
    "name": "",
    "domain_name": "",
    "is_deleted": "",
    "limit": ""
  });

  const total = useSelector((state) => state.SubDomain.total);
  const isDeleted = useSelector((state) => state.SubDomain.isDeleted);

  useEffect(() => {
    if (isDeleted) {
      dispatch(subDomainListAction({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [isDeleted, dispatch]);

  useEffect(() => {
    if (page) {
      dispatch(subDomainListAction({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [page]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    if (page === 1) dispatch(subDomainListAction({ ...filters, limit: event.target.value, page: 1 }));
    else setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    filters["page"] = newPage;
    setPage(newPage);
  };

  const handleUpdate = (id) => {
    navigate(`/app/sub_domain/update/${id}`);
  };

  const handleStatus = (ids, isDeleted) => {
    let val = "0";
    isDeleted === "1" ? (val = "0") : (val = "1");
    customAlert("Are you sure you want to change it's status? ", () => {
      dispatch(subDomainDeleteAction({ id: ids, isDeleted: val }));
    });
  };

  const sortData = (key) => {
    let value = sortVlaues[key];
    value = value === "" ? 1 : value * -1;
    let sortObj = {
      sortName: "name" === key ? value : "",
      sortDomainName: "domain_name" === key ? value : "",
      sortCreatedAt: "created_at" === key ? value : "",
      sortUpdatedAt: "updated_at" === key ? value : "",
      sortIsDeleted: "is_deleted" === key ? value : "",
    };
    let newSortObj = {};
    Object.keys(sortVlaues).forEach((key2) => {
      newSortObj[key2] = key2 === key ? sortVlaues[key2] : "";
    });
    newSortObj[key] = value;
    setSortValues(newSortObj);
    dispatch(subDomainListAction({ ...sortObj, limit, page }));
  };

  useEffect(() => {
    if (filters?.page) {
      setPage(filters.page);
    }
  }, [filters]);

  const searchData = (e) => {
    setPage(1);
    filters["page"] = 1;
    filters[e.target.name] = e.target.value;
    dispatch(subDomainListAction(filters));
  };

  useEffect(() => {
    dispatch(subDomainSelectedAction(selected));
  }, [selected, dispatch]);

  // ------------Related to Row selections-----------------//
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((obj) => obj.id);
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
      () => dispatch(subDomainDeleteAction({ id: selected, isDeleted: "0" }))
    );
  };

  const filterData = {
    onSubmit: (data) => {
      setFilters({ ...filters, ...data });
      if (page !== 1) setPage(1);
      else dispatch(subDomainListAction({ ...filters, ...data, page: 1, limit: filters.limit }));
    },
    onReset: () => resetFilterHandler(),
    fields: [
      { name: "name", type: "text", title: "Subdomain Name" },
      { name: "domain_name", type: "text", title: "Domain Name" },
      { name: "is_deleted", type: "select", title: "Status", optionsArray: [{ name: "Active", id: "1" }, { name: "Inactive", id: "0" }] },
    ],
  };

  const resetFilterHandler = () => {
    let clonedFilter = { ...filters };
    for (let elem in clonedFilter) clonedFilter[elem] = "";
    setFilters(clonedFilter);
    setLimit(10);
    if (page === 1) dispatch(subDomainListAction({ page: 1 }));
    else setPage(1);
  }

  // const handleDelete = (ids) => {
  //   customAlert("Are you sure you want to delete this?", () =>
  //     dispatch(subDomainDeleteAction(ids))
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
                        selected.length > 0 && selected.length < data?.length
                      }
                      checked={
                        data?.length > 0 && selected.length === data?.length
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
                      "name",
                      "domain_name",
                      "created_at",
                      "updated_at",
                      "is_deleted",
                    ];
                    let sortArr = [
                      "Subdomain Name",
                      "Domain Name",
                      "Created At",
                      "Updated At",
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
                      } else if (column === "Status") {
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
                {data && data.length > 0
                  ? data.map((singleData) => {
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
                          {singleData.name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.domain_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {moment(singleData.created_at).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell className="tableCell">
                          {moment(singleData.updated_at).format("DD/MM/YYYY")}
                        </TableCell>
                        {isActionAuth(
                          "DISTRICT",
                          "CREATE",
                          _pageAuthentication
                        ) &&
                          isActionAuth(
                            "DISTRICT",
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
                                          `/app/sub_domain/view/${singleData.id}`
                                        )
                                      }
                                    />
                                  )}

                                {isActionAuth(
                                  "DISTRICT",
                                  "CREATE",
                                  _pageAuthentication
                                ) && (
                                    <EditIcon
                                      className="cellEditBtn"
                                      onClick={() => handleUpdate(singleData.id)}
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
      </Card>
    </Box>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  //   userData: PropTypes.array.isRequired
};

export default DataTable;
