import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import TableList from "src/components/Form/Table";
import Page from "src/components/Page";
import { fetchWrapper } from '../../services/http_requests'
import { toast } from 'react-toastify';
import { filterUrl } from "src/utils/halper";
import { useParams } from "react-router-dom";
import ViewData from "src/components/Form/View";
const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(10),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

export const AttendanceView = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    "date": "",
    "ispresent": ""
  });
  const [total, setTotal] = useState(0);
  const [list, setListData] = useState([]);
  const [fetchedData, setFetchedData] = useState([]);

  const limitSet = (limit) => {
    setLimit(limit)
  }
  const pageSet = (limit) => {
    setPage(limit)
  }
  const ListData = async (filters) => {
    setIsLoading(true)
    setFilters({ ...filters, id });
    let url = `${baseUrl}attendance/view${filterUrl({ ...filters, id })}`;
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
  }

  const deleteItem = async (ids) => {
    let url = `${baseUrl}attendance/delete/${ids}`;
    try {
      let data = await fetchWrapper.put(url);
      toast.success(data?.data?.message);
      ListData({ page: 1 });
    } catch (error) {
      toast.error(error);
    }
  }
  useEffect(() => {
    ListData(filters);
  }, []);

  useEffect(() => {
    if (id) {
      FetchedData(id);
    }
  }, [id]);

  let tableData = {
    sortField: {
      "date": "",
      "ispresent": ""
    },
    tableConfig: [
      {
        "key": "date",
        "title": "Date",
        "type": "date",
        "date_format": "DD-MM-YYYY",
        "sort": true,
        "filter": true,
        "visible": true
      },
      {
        "key": "ispresent",
        "title": "Is Present",
        "type": "string",
        "sort": true,
        "filter": true,
        "visible": true
      },
      {
        "key": "",
        "title": "Action",
        "type": "Button",
        "sort": false,
        "visible": false
      }
    ],
    data: list,
    isDeletedButtonShow: true,
    isUpdatedButtonShow: true,
    isViewButtonShow: true,
    limitSet,
    pageSet,
    total,
    limit,
    page,
    filters,
    action: {
      thTitle: "ABC",
      "add": null,
      "update": null,
      "delete": null,
      "view": null
    },
    isPagination: true,
    eventLister: {
      ListData,
      deleteItem
    }
  }

  let objTable = {
    tableConfig: [
      {
        "key": "state",
        "title": "State",
        "type": "string",
        "visible": true
      },
      {
        "key": "district",
        "title": "District",
        "type": "string",
        "visible": true
      },
      {
        "key": "block",
        "title": "Block",
        "type": "string",
        "visible": true
      },
      {
        "key": "cluster",
        "title": "Cluster",
        "type": "string",
        "visible": true
      },
      {
        "key": "village",
        "title": "Village",
        "type": "string",
        "visible": true
      },
      {
        "key": "ben_name",
        "title": "Beneficiary name",
        "type": "string",
        "visible": true
      },
      {
        "key": "gender",
        "title": "Gender",
        "type": "string",
        "visible": true
      },
      {
        "key": "school",
        "title": "school",
        "type": "string",
        "visible": true
      },
      {
        "key": "class",
        "title": "Class",
        "type": "string",
        "visible": true,
      },
    ],
  }

  const FetchedData = async (id) => {
    let url = `${baseUrl}attendance/beneficiary_list?id=${id}`;
    try {
      let data = await fetchWrapper.get(url);
      setFetchedData(data?.data);
    } catch (error) {
      toast.error(error);
    }
  }

  let objView = Object.assign(objTable, { data: fetchedData });
  return (
    <Page className={classes.root} href="/app/attendance/list" title="Attendance view">
      {fetchedData.length && (<ViewData objView={objView} />)}
      {isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <TableList tableData={tableData} />
    </Page>
  );
};

