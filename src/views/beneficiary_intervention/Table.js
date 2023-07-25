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
import VisibilityIcon from "@material-ui/icons/Visibility";
// import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
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
import TableSearch from "src/components/TableSearch";

import { benInterventionListAction } from "src/Redux/BeneficiaryIntervention/action";
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
  "Beneficiary name",
  "Volunteer name",
  "Current enrollement status",
  "Status of case",
  "Updated At",
  "Action",
];

const DataTable = ({ className, StateData, data, ...rest }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const beneficiary_id = decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        "^(?:.*[&\\?]" +
        encodeURIComponent("beneficiary_id").replace(/[.+*]/g, "\\$&") +
        "(?:\\=([^&]*))?)?.*$",
        "i"
      ),
      "$1"
    )
  );
  // const beneficiary_id =  decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("beneficiary_id").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
  // const beneficiary_id = "";
  const [sortVlaues, setSortValues] = useState({
    beneficiary_name: "",
    volunteer_name: "",
    enrollement_status_of_student: "",
    status_of_case: "",
    created_at: "",
    updated_at: "",
  });
  const total = useSelector((state) => {
    return state.beneficiaryIntervention.total;
  });
  const filters = useSelector((state) => state.beneficiaryIntervention.filters);

  const handleLimitChange = (event) => {
    filters["limit"] = event.target.value;
    filters["beneficiary_id"] = beneficiary_id ? beneficiary_id : "";
    dispatch(benInterventionListAction(filters));
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    filters["page"] = newPage;
    filters["beneficiary_id"] = beneficiary_id ? beneficiary_id : "";
    dispatch(benInterventionListAction(filters));
    setPage(newPage);
  };

  const handleView = (id) => {
    navigate(`/app/beneficiary_intervention/view/${id}`);
  };

  const sortData = (key) => {
    let value = sortVlaues[key];
    value = value === "" ? 1 : value * -1;
    let sortObj = {
      sortBenName: "beneficiary_name" === key ? value : "",
      sortEnrollStatus: "enrollement_status_of_student" === key ? value : "",
      sortCreatedAt: "created_at" === key ? value : "",
      sortUpdatedAt: "updated_at" === key ? value : "",
      beneficiary_id: beneficiary_id ? beneficiary_id : "",
      sortVolunteerName: "volunteer_name" === key ? value : "",
      sortStatusOfCase: "status_of_case" === key ? value : "",
    };
    let newSortState = {};
    Object.keys(sortVlaues).forEach((key2) => {
      newSortState[key2] = key2 === key ? sortVlaues[key2] : "";
    });
    newSortState[key] = value;
    setSortValues(newSortState);
    dispatch(benInterventionListAction({ ...sortObj, limit, page }));
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
    filters["beneficiary_id"] = beneficiary_id ? beneficiary_id : "";
    dispatch(benInterventionListAction(filters));
  };

  const _pageAuthentication = [];
  return (
    <Card className={clsx(classes.root, className)} {...rest} elevation={0}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table dense="true" size="small" table="true">
            <TableHead>
              <TableRow>
                {tableColumn.map((column, i) => {
                  let arr = [
                    "beneficiary_name",
                    "volunteer_name",
                    "enrollement_status_of_student",
                    "status_of_case",
                    "created_at",
                    "updated_at",
                  ];
                  let sortArr = [
                    "Beneficiary name",
                    "Volunteer name",
                    "Current enrollement status",
                    "Status of case",
                    "Created At",
                    "Updated At",
                  ];
                  let dropdownList = [
                    {
                      key: "enrollement_status_of_student",
                      list: [
                        { name: "Enrolled", id: "1" },
                        { name: "Not Enrolled", id: "2" },
                        { name: "Potential Dropout", id: "3" },
                        { name: "Dropout", id: "4" },
                      ],
                    },
                    {
                      key: "status_of_case",
                      list: [
                        { name: "Follow up", id: "1" },
                        { name: "Close", id: "2" }
                      ],
                    },
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
                        <TableSearch
                          column={arr[index]}
                          onChange={searchData}
                          dropdown={dropdownList}
                        />
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
              {data && data.length > 0
                ? data.map((singleData) => {
                  return (
                    <TableRow hover key={singleData.id}>
                      <TableCell className="tableCell">
                        {singleData.beneficiary_name}
                      </TableCell>
                      <TableCell className="tableCell">
                        {singleData.volunteer_name}
                      </TableCell>
                      <TableCell className="tableCell">
                        {singleData.enrollement_status_of_student}
                      </TableCell>
                      <TableCell className="tableCell">
                        {singleData.status_of_case}
                      </TableCell>
                      <TableCell className="tableCell">
                        {moment(singleData.updated_at).format("DD-MM-YYYY")}
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
                          </TableCell>
                        )}
                    </TableRow>
                  );
                })
                : ""}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" alignItems="center" justifyContent="flex-end" my={2}>
        <label style={{ fontSize: "0.9rem" }}>Rows per page:</label>
        <FormControl className={classes.formControl}>
          <Select
            style={{ width: 60, height: 20, fontSize: "0.9rem" }}
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
        <p style={{ marginRight: "1rem", fontSize: "0.9rem" }}>
          Total: {total}
        </p>
        <Pagination
          style={{ position: "relative" }}
          showFirstButton
          showLastButton
          // count={1}
          // page={1}
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
