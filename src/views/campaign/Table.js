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
import LocationOnIcon from "@material-ui/icons/LocationOn";
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
import { fetchApi, rowsPerPageOptions } from "../../utils/halper";
import { isActionAuth } from "src/utils/sessionStorage";
import {
  campaignListAction,
  compaignSelectedAction,
  deleteDataAction,
} from "src/Redux/Campaign/action";
import TableSearch from "src/components/TableSearch";
import VisibilityIcon from "@material-ui/icons/Visibility";
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
  "Name",
  "Campaign Type",
  "Start Date",
  "End Date",
  "Action",
  "Status",
];

const DataTable = ({ className, campaignData, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);

  const [sortVlaues, setSortValues] = useState({
    name: "",
    campaign_type: "",
    is_deleted: "",
  });

  const [filters, setFilters] = useState({
    "name": "",
    "campaign_type": "",
    "is_deleted": "",
    "limit": ""
  });

  const total = useSelector((state) => state.campaign.total);
  const isDeleted = useSelector((state) => state.campaign.isDeleted);

  useEffect(() => {
    if (isDeleted) {
      dispatch(campaignListAction({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [dispatch, isDeleted]);

  useEffect(() => {
    if (page) {
      dispatch(campaignListAction({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [page]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    if (page === 1) dispatch(campaignListAction({ ...filters, limit: event.target.value, page: 1 }));
    else setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    filters['page'] = newPage;
    setPage(newPage);
  };

  const updateData = (id) => {
    navigate(`/app/campaign/update/${id}`);
  };

  const handleStatus = (ids, isDeleted) => {
    let val = "0";
    isDeleted === "1" ? (val = "0") : (val = "1");
    customAlert("Are you sure you want to change it's status? ", () => {
      dispatch(deleteDataAction({ id: ids, isDeleted: val }));
    });
  };

  const handleView = (id) => {
    navigate(`/app/campaign/view/${id}`);
  };

  const sortData = (key) => {
    let value = sortVlaues[key];
    value = value === "" ? 1 : value * -1;
    let sortObj = {
      sortName: "name" === key ? value : "",
      sortCampaignType: "campaign_type" === key ? value : "",
      sortIsDeleted: "is_deleted" === key ? value : "",
    };

    let newSortState = {};
    Object.keys(sortVlaues).forEach((key2) => {
      newSortState[key2] = key2 === key ? sortVlaues[key2] : "";
    });
    newSortState[key] = value;
    setSortValues(newSortState);
    dispatch(campaignListAction({ ...sortObj, limit, page }));
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
      else dispatch(campaignListAction({ ...filters, ...data, page: 1, limit: filters.limit }));
    },
    onReset: () => resetFilterHandler(),
    fields: [
      { name: "name", type: "text", title: "Name" },
      { name: "campaign_type", type: "text", title: "Campaign Type" },
      { name: "is_deleted", type: "select", title: "Status", optionsArray: [{ name: "Active", id: "1" }, { name: "Inactive", id: "0" }] },
    ],
  };

  const resetFilterHandler = () => {
    let clonedFilter = { ...filters };
    for (let elem in clonedFilter) clonedFilter[elem] = "";
    setFilters(clonedFilter);
    setLimit(10);
    if (page === 1) dispatch(campaignListAction({ page: 1 }));
    else setPage(1);
  }

  useEffect(() => {
    dispatch(compaignSelectedAction(selected));
  }, [selected, dispatch]);

  // ------------Related to Row selections-----------------//
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = campaignData.data?.map((obj) => obj.id);
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
      () => dispatch(deleteDataAction({ id: selected, isDeleted: "0" }))
    );
  };

  // const handleDelete = (ids) => {
  //   customAlert("Are you sure you want to delete this?", () =>
  //     dispatch(deleteDataAction(ids))
  //   );
  // };
  // ------------Related to Row selections-----------------//

  const _pageAuthentication = [];
  // const _pageAuthentication = useSelector((state) => {
  //   return state.PageAuthentication.data.data;
  // });

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
                        selected.length < campaignData.data?.length
                      }
                      checked={
                        campaignData.data?.length > 0 &&
                        selected.length === campaignData.data?.length
                      }
                      onChange={handleSelectAllClick}
                      inputProps={{ "aria-label": "select all desserts" }}
                    />
                  </TableCell>
                  {tableColumn.map((column, i) => {
                    let dropdown = [
                      {
                        key: "campaign_type",
                        list: [
                          { id: "1", name: "New" },
                          { id: "2", name: "Existing" },
                        ],
                      },
                      {
                        key: "is_deleted",
                        list: [
                          { name: "Active", id: "1" },
                          { name: "Inactive", id: "0" },
                        ],
                      },
                    ];
                    let arr = ["name", "campaign_type", "is_deleted"];
                    let sortArr = ["Name", "Campaign Type", "Status"];
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
                          {/* <TableSearch
                          column={arr[index]}
                          dropdown={dropdown}
                          onChange={searchData}
                        /> */}
                        </TableCell>
                      );
                    } else {
                      if (
                        isActionAuth("BLOCK", "UPDATE", _pageAuthentication) &&
                        isActionAuth("BLOCK", "DELETE", _pageAuthentication) &&
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
                              dropdown={dropdown}
                              onChange={searchData}
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
                {campaignData.data?.length > 0
                  ? campaignData.data.map((singleData) => {
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
                          {singleData.campaign_type_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {moment(singleData.start_date).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.end_date
                            ? moment(singleData.end_date).format("DD/MM/YYYY")
                            : ""}
                        </TableCell>
                        {/* <TableCell className="tableCell">
                          {singleData.is_deleted === "1"
                            ? "Active"
                            : "Inactive"}
                        </TableCell> */}
                        {isActionAuth("BLOCK", "CREATE", _pageAuthentication) &&
                          isActionAuth(
                            "BLOCK",
                            "DELETE",
                            _pageAuthentication
                          ) && (
                            <TableCell className="tableCell">
                              <div className="switchWrapper">
                                {isActionAuth(
                                  "STATE",
                                  "DELETE",
                                  _pageAuthentication
                                ) && (
                                    <LocationOnIcon
                                      className="cellLocationBtn"
                                      onClick={() =>
                                        navigate(
                                          `/app/campaign/locations/${singleData.id}`
                                        )
                                      }
                                    />
                                  )}

                                {isActionAuth(
                                  "STATE",
                                  "DELETE",
                                  _pageAuthentication
                                ) && (
                                    <VisibilityIcon
                                      className="cellViewBtn"
                                      onClick={() => handleView(singleData.id)}
                                    />
                                  )}
                                {isActionAuth(
                                  "BLOCK",
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

      </Card>
    </Box>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
};

export default DataTable;
