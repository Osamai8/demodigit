import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import TableList from "src/components/Form/Table";
import Page from "src/components/Page";
import { fetchWrapper } from '../../services/http_requests'
import { toast } from 'react-toastify';
import { fetchApi, filterUrl } from "src/utils/halper";
const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(10),
  }
}));
export const School = () => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    "name": "",
    "state_id": "",
    "district_id": "",
    "block_id": "",
    "cluster_id": "",
    "village_id": "",
    "udise_code": "",
    "created_at": "",
    "limit": ""
  });
  const [total, setTotal] = useState(0);
  const [lists, setListData] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [blockList, setBlockList] = useState([]);
  const [clusterList, setClusterList] = useState([]);
  const [villageList, setVillageList] = useState([]);

  const limitSet = (limit) => {
    setLimit(limit)
  }

  const pageSet = (limit) => {
    setPage(limit)
  }
  const ListData = async (filters) => {
    setIsLoading(true)
    let url = `${baseUrl}school/list${filterUrl(filters)}`;
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
  const resetFilterHandler = () => {
    let clonedFilter = { ...filters };
    for (let elem in clonedFilter) clonedFilter[elem] = "";
    setFilters(clonedFilter);
    setLimit(10);
    if (page === 1) ListData({ page: 1 });
    else setPage(1);
  }
  const deleteItem = async (ids) => {
    let url = `${baseUrl}school/delete/${ids}`;
    try {
      let data = await fetchWrapper.put(url);
      toast.success(data?.data?.message);
      ListData({ page: 1 });
    } catch (error) {
      toast.error(error);
    }
  }

  let tableData = {
    sortField: {
      "name": "",
      "state_name": "",
      "district_name": "",
      "block_name": "",
      "cluster_name": "",
      "udise_code": "",
      "created_at": ""
    },
    tableConfig: [
      {
        "key": "state_name",
        "title": "State",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "district_name",
        "title": "District",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "block_name",
        "title": "Block",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "cluster_name",
        "title": "Cluster",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "village_name",
        "title": "Village",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "name",
        "title": "School",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "udise_code",
        "title": "UDISE Code",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      // {
      //   "key": "created_at",
      //   "title": "Created At",
      //   "type": "date",
      //   "date_format": "DD-MM-YYYY",
      //   "sort": true,
      //   "filter": false,
      //   "visible": true
      // },
      {
        "key": "",
        "title": "Action",
        "type": "Button",
        "sort": false,
        "visible": true
      }
    ],
    data: lists,
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
      "update": "/app/school/update",
      "delete": null,
      "view": null
    },
    isPagination: true,
    eventLister: {
      ListData,
      deleteItem
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
      {
        name: "state_id", type: "select", title: "State ", optionsArray: stateList,
        onChange: (value) => fetchApi("district/list", setDistrictList, { state_id: value, fetched: "All" }),
        reset: ["district_id", "block_id", "cluster_id", "village_id"]
      },
      {
        name: "district_id", type: "select", title: "District", optionsArray: districtList,
        onChange: (value) => fetchApi("block/list", setBlockList, { state_id: value, district_id: value, fetched: "All" }),
        reset: ["block_id", "cluster_id", "village_id"]
      },
      {
        name: "block_id", type: "select", title: "Block", optionsArray: blockList,
        onChange: (value) => fetchApi("cluster/list", setClusterList, { state_id: value, district_id: value, block_id: value, fetched: "All" }),
        reset: ["cluster_id", "village_id"]
      },
      {
        name: "cluster_id", type: "select", title: "Cluster", optionsArray: clusterList,
        onChange: (value) => fetchApi("village/list", setVillageList, { state_id: value, district_id: value, block_id: value, cluster_id: value, fetched: "All" }),
        reset: ["village_id"]
      },
      { name: "village_id", type: "select", title: "Village", optionsArray: villageList, },
      { name: "name", type: "text", title: "School" },
      { name: "udise_code", type: "number", title: "UDISE Code" },
    ],
  };

  useEffect(() => {
    ListData({ ...filters, page: page, limit: limit });
  }, [page]);

  useEffect(() => {
    fetchApi("state/list", setStateList, { fetched: "All" })
  }, []);
  return (
    <Page
      title="Master/School"
      btnTitle="Add school"
      href="/app/school/create"
      className={classes.root}
      csvTitle={"School"}
      downloadUrl="school/csv"
      csvFilters={{ ...filters }}
      filterData={filterData}
    >
      {isLoading ? <CircularProgress className="commonLoader" /> : ""}
      <Box>
        <TableList tableData={tableData} />
      </Box>
    </Page>
  );
};
