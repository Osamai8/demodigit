import React, { useState, useEffect } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Page from "../../components/Page";
import { fetchWrapper } from "src/services/http_requests";
import { toast } from "react-toastify";
import { filterUrl } from "src/utils/halper";
import TableList from "src/components/Form/Table";
const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(10),
  }
}));

const CommunityIntervention = () => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [lists, setListData] = useState([]);
  const [filters, setFilters] = useState({
    "beneficiary_name": "",
    "volunteer_name": "",
    "enrollement_status_of_student": "",
    "status_of_case": "",
    "limit": ""
  });

  const limitSet = (limit) => {
    setLimit(limit)
  };

  const pageSet = (limit) => {
    setPage(limit)
  };

  const ListData = async (filters) => {
    setIsLoading(true)
    let url = `${baseUrl}beneficiary-intervention/list${filterUrl(filters)}`;
    try {
      let data = await fetchWrapper.get(url);
      if (data?.total) {
        setTotal(data?.total);
      }
      setListData(data?.data);
      setIsLoading(false)
    } catch (error) {
      toast.error(error);
      setIsLoading(false)
    }
  };
  const resetFilterHandler = () => {
    let clonedFilter = { ...filters };
    for (let elem in clonedFilter) clonedFilter[elem] = "";
    setFilters(clonedFilter);
    setLimit(10);
    if (page === 1) ListData({ page: 1 });
    else setPage(1);
  }

  let tableData = {
    sortField: {
      "beneficiary_name": "",
      "volunteer_name": "",
      "enrollement_status_of_student": "",
      "status_of_case": "",
      "updated_at": ""
    },
    tableConfig: [
      {
        "key": "beneficiary_name",
        "title": "Beneficiary Name",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "volunteer_name",
        "title": "Volunteer Name",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "enrollement_status_of_student",
        "title": "Current enrollement status",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "status_of_case",
        "title": "Status of case",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "updated_at",
        "title": "Updated At",
        "type": "date",
        "date_format": "DD-MM-YYYY",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "",
        "title": "Action",
        "type": "Button",
        "sort": false,
        "visible": true
      }
    ],
    data: lists,
    isDeletedButtonShow: false,
    isUpdatedButtonShow: false,
    isViewButtonShow: true,
    limitSet,
    pageSet,
    total,
    limit,
    page,
    filters,
    action: {
      thTitle: "ABCD",
      "add": null,
      "update": null,
      "delete": null,
      "view": `/app/beneficiary_intervention/view`
    },
    isPagination: true,
    eventLister: {
      ListData,
      // deleteItem
    }
  }

  const filterData = {
    onSubmit: (data) => {
      setFilters({ ...filters, ...data });
      if (page !== 1) setPage(1);
      else ListData({ ...filters, ...data, page: 1, limit: filters.limit });
    },
    onReset: () => resetFilterHandler(),
    fields: [
      { name: "beneficiary_name", type: "text", title: "Beneficiary Name" },
      { name: "volunteer_name", type: "text", title: "Volunteer Name" },
      { name: "enrollement_status_of_student", type: "text", title: "Current enrollement status" },
      { name: "status_of_case", type: "text", title: "Status of case" },
    ],
  };

  useEffect(() => {
    ListData({ ...filters, page: page, limit: limit });
  }, [page]);

  return (
    <Page
      href="/app/beneficiary_intervention/list"
      title="Beneficiary Intervention"
      downloadUrl="beneficiary_intervention/csv"
      className={classes.root}
      csvFilters={{ ...filters }}
      filterData={filterData}
    >
      {isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <TableList tableData={tableData} />
    </Page>
  );
};

export default CommunityIntervention;
