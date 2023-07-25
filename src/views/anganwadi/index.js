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
export const Anganwadi = () => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    "name": "",
    "state_id": "",
    "district_id": "",
    "cluster_id": "",
    "block_id": "",
    "village_id": "",
    "contact_number_worker": "",
    "name_of_worker": "",
    "population_covered": "",
    "code": "",
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
    let url = `${baseUrl}anganwadi/list${filterUrl(filters)}`;
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
    let url = `${baseUrl}anganwadi/delete/${ids}`;
    try {
      let data = await fetchWrapper.put(url);
      toast.success(data?.data?.message);
      ListData({ page: 1 });
    } catch (error) {
      toast.error(error);
    }
  }

  // "type": "number" | "string" | "array" | "arrayOfObject" | "date" | "datetime" | "object" | "clickableString" | "link" | "icon"|
  let tableData = {
    sortField: {
      "name": "",
      "state": "",
      "district": "",
      "cluster": "",
      "block": "",
      "village": "",
      "contact_number_worker": "",
      "name_of_worker": "",
      "population_covered": "",
      "code": ""
    },
    tableConfig: [
      {
        "key": "state",
        "title": "State",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "district",
        "title": "District",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "block",
        "title": "Block",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "cluster",
        "title": "Cluster",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "village",
        "title": "Village",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "name",
        "title": "Anganwadi",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "code",
        "title": "Anganwadi Code",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "population_covered",
        "title": "Population Covered",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "name_of_worker",
        "title": "Name of worker",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "contact_number_worker",
        "title": "Contact number worker",
        "type": "string",
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
    isUpdatedButtonShow: true,
    isViewButtonShow: false,
    limitSet,
    pageSet,
    total,
    limit,
    page,
    filters,
    action: {
      thTitle: "ABC",
      "add": null,
      "update": "/app/anganwadi/update",
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
      { name: "name", type: "text", title: "Anganwadi" },
      { name: "code", type: "number", title: "Anganwadi Code" },
      { name: "population_covered", type: "number", title: "Population Covered" },
      { name: "name_of_worker", type: "text", title: "Name of worker" },
      { name: "contact_number_worker", type: "number", title: "Worker contact number" },
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
      title="Master/Anganwadi"
      btnTitle="Add Anganwadi"
      href="/app/anganwadi/create"
      className={classes.root}
      csvTitle={"Anganwadi"}
      downloadUrl="anganwadi/csv"
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
