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
import { fetchApi, rowsPerPageOptions } from "../../utils/halper";
import { isActionAuth } from "src/utils/sessionStorage";
import {
  beneficiaryListAction,
  beneficiarySelectedAction,
  deleteDataAction,
} from "src/Redux/Beneficiary/action";
import { customAlert } from "src/utils/customAlert";
import { campaignListAction } from "src/Redux/Campaign/action";
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
  "First Name",
  "State Name",
  "District Name",
  "Mobile Number",
  "Campaign Name",
  "Volunteer",
  "Created At",
  // "Beneficiary Intervention",
  "Action",
  "Status",
];

const DataTable = ({ className, StateData, data, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  // const [campaignData, setCampaignData] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);

  const [sortVlaues, setSortValues] = useState({
    first_name: "",
    state_name: "",
    district_name: "",
    mobile_number: "",
    campaign_id: "",
    volunteer: "",
    is_deleted: "",
    created_at: "",
  });
  const [filters, setFilters] = useState({
    "first_name": "",
    "state_id": "",
    "district_id": "",
    "mobile_number": "",
    "campaign_id": "",
    "volunteer": "",
    "is_deleted": "",
    "limit": ""
  });
  const total = useSelector((state) => state.beneficiary.total);
  const isDeleted = useSelector((state) => state.beneficiary.isDeleted);
  const campaigns = useSelector((state) => state.campaign);

  useEffect(() => {
    if (isDeleted) {
      dispatch(beneficiaryListAction({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [isDeleted, dispatch]);

  useEffect(() => {
    if (page) {
      dispatch(beneficiaryListAction({ ...filters, page: page, limit: limit }));
      setSelected([]);
    }
  }, [page]);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
    if (page === 1) dispatch(beneficiaryListAction({ ...filters, limit: event.target.value, page: 1 }));
    else setPage(1);
  };

  const handlePageChange = (event, newPage) => {
    filters["page"] = newPage;
    setPage(newPage);
  };

  const updateData = (id) => {
    navigate(`/app/beneficiary/update/${id}`);
  };

  const handleStatus = (ids, isDeleted) => {
    let val = "0";
    isDeleted === "1" ? (val = "0") : (val = "1");
    customAlert("Are you sure you want to change it's status? ", () => {
      dispatch(deleteDataAction({ id: ids, isDeleted: val }));
    });
  };

  const handleView = (id) => {
    navigate(`/app/beneficiary/view/${id}`);
  };

  useEffect(() => {
    dispatch(campaignListAction());
    fetchApi("state/list", setStateList, { fetched: "All" })
  }, []);

  // const campaignList = async () => {
  //   let url = `${baseUrl}campaign/list?fetched=All`;
  //   try {
  //     let data = await fetchWrapper.get(url);
  //     setCampaignData(data?.data);
  //   } catch (error) {
  //     toast.error(error);
  //   }
  // };


  // useEffect(() => {
  //    console.log("=======>>>>>>>",campaignData)
  // }, [campaignData])
  const sortData = (key) => {
    let value = sortVlaues[key];
    value = value === "" ? 1 : value * -1;
    let sortObj = {
      sortFirstName: "first_name" === key ? value : "",
      sortStateName: "state_name" === key ? value : "",
      sortDistrictName: "district_name" === key ? value : "",
      sortMobileNumber: "mobile_number" === key ? value : "",
      sortIsDeleted: "is_deleted" === key ? value : "",
      sortVolunteer: "volunteer" === key ? value : "",
      sort_campaign_id: "campaign_id" === key ? value : "",
      sortCreatedAt: "created_at" === key ? value : "",
    };
    let newSortState = {};
    Object.keys(sortVlaues).forEach((key2) => {
      newSortState[key2] = key2 === key ? sortVlaues[key2] : "";
    });
    newSortState[key] = value;
    setSortValues(newSortState);
    dispatch(beneficiaryListAction({ ...sortObj, limit, page }));
  };

  const filterData = {
    onSubmit: (data) => {
      setFilters({ ...filters, ...data });
      if (page !== 1) setPage(1);
      else dispatch(beneficiaryListAction({ ...filters, ...data, page: 1, limit: filters.limit }));
    },
    onReset: () => resetFilterHandler(),
    fields: [
      {
        name: "state_id", type: "select", title: "State ", optionsArray: stateList,
        onChange: (value) => fetchApi("district/list", setDistrictList, { state_id: value, fetched: "All" }),
        reset: ["district_id"]
      },
      { name: "district_id", type: "select", title: "District", optionsArray: districtList },
      { name: "first_name", type: "text", title: "First Name" },
      { name: "mobile_number", type: "number", title: "Mobile Number" },
      { name: "campaign_type", type: "select", title: "Campaign Type", optionsArray: campaigns?.data?.data || [] },
      { name: "volunteer", type: "text", title: "Volunteer Name" },
      { name: "is_deleted", type: "select", title: "Status", optionsArray: [{ name: "Active", id: "1" }, { name: "Inactive", id: "0" }] },
    ],
  };

  const resetFilterHandler = () => {
    let clonedFilter = { ...filters };
    for (let elem in clonedFilter) clonedFilter[elem] = "";
    setFilters(clonedFilter);
    setLimit(10);
    if (page === 1) dispatch(beneficiaryListAction({ page: 1 }));
    else setPage(1);
  }

  useEffect(() => {
    if (filters?.page) {
      setPage(filters.page);
    }
  }, [filters]);

  useEffect(() => {
    dispatch(beneficiarySelectedAction(selected));
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
      () => dispatch(deleteDataAction({ id: selected, isDeleted: "0" }))
    );
  };

  const veneficiaryInterventionView = (id) => {
    navigate(`/app/beneficiary_intervention/list?beneficiary_id=${id}`);
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
                    let arr = [
                      "first_name",
                      "state_name",
                      "district_name",
                      "mobile_number",
                      "campaign_id",
                      "volunteer",
                      "created_at",
                      "is_deleted",
                    ];
                    let sortArr = [
                      "First Name",
                      "State Name",
                      "District Name",
                      "Mobile Number",
                      "Campaign Name",
                      "Volunteer",
                      "Created At",
                      "Status",
                    ];
                    let isActiveList = [
                      {
                        key: "is_deleted",
                        list: [
                          { name: "Active", id: "1" },
                          { name: "Inactive", id: "0" },
                        ],
                      },
                      // {
                      //   key: "campaign_name",
                      //   list: campaignData
                      // },
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
                          {singleData.first_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.state_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.district_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.mobile_number}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.campaign_name}
                        </TableCell>
                        <TableCell className="tableCell">
                          {singleData.volunteer}
                        </TableCell>
                        <TableCell className="tableCell">
                          {moment(singleData.created_at).format("DD/MM/YYYY")}
                        </TableCell>
                        {/* <TableCell className="tableCell">
                        <Button
                          onClick={() =>
                            veneficiaryInterventionView(singleData.id)
                          }
                          variant="success"
                        >
                          {singleData.intervention_count}
                        </Button>
                      </TableCell> */}

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
                            <TableCell className="tableCell">
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
                                "DISTRICT",
                                "CREATE",
                                _pageAuthentication
                              ) && (
                                  <EditIcon
                                    className="cellEditBtn"
                                    onClick={() => updateData(singleData.id)}
                                  />
                                )}
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
