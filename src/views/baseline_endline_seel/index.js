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
export const BaselineEndlineSeel = () => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    "ben_name": "",
    "class": "",
    "volunteer_name": "",
    "school_name": "",
    "assessment_cycle": "",
    "reading_capability": "",
    "math_practice_capability": "",
    "state_id": "",
    "district_id": "",
    "cluster_id": "",
    "block_id": "",
    "village_id": "",
    "created_at": "",
    "type": 2,
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
    let url = `${baseUrl}baseline-endline/list${filterUrl({ ...filters, "type": '2' })}`;
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
    let url = `${baseUrl}baseline-endline/delete/${ids}`;
    try {
      let data = await fetchWrapper.put(url);
      toast.success(data?.data?.message);
      ListData({ page: 1 });
    } catch (error) {
      toast.error(error);
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

  // "type": "number" | "string" | "array" | "arrayOfObject" | "date" | "datetime" | "object" | "clickableString" | "link" | "icon"|
  let tableData = {
    sortField: {
      "ben_name": "",
      "school_name": "",
      "volunteer_name": "",
      "created_at": ""
    },
    tableConfig: [
      {
        "key": "assessment_cycle",
        "title": "Assessment cycle",
        "filter_data": [
          { name: "Baseline", id: "1" },
          { name: "Endline 1", id: "2" },
          { name: "Endline 2", id: "3" },
        ],
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "ben_name",
        "title": "Beneficiary name",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "volunteer_name",
        "title": "Volunteer name",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
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
        "key": "school_name",
        "title": "School name",
        "type": "string",
        "sort": true,
        "filter": false,
        "visible": true
      },
      {
        "key": "class",
        "title": "Class",
        "type": "string",
        "filter_data": [
          { name: "I", id: "1" },
          { name: "II", id: "2" },
          { name: "III", id: "3" },
          { name: "IV", id: "4" },
          { name: "V", id: "5" },
          { name: "VI", id: "6" },
          { name: "VII", id: "7" },
          { name: "VIII", id: "8" },
          { name: "IX", id: "9" },
          { name: "X", id: "10" },
        ],
        sort: true,
        filter: true,
        visible: true,
      },
      {
        "key": "emotional_identity",
        "title": "Identifies self",
        "type": "string",
        "sort": false,
        "filter": false,
        "visible": true
      },
      {
        "key": "emotional_awareness",
        "title": "Demonstrates and celebrates oneself",
        "type": "string",
        "sort": false,
        "filter": false,
        "visible": true
      },
      {
        "key": "emotional_expression",
        "title": "Expresses one",
        "type": "string",
        "sort": false,
        "filter": false,
        "visible": true
      },
      {
        "key": "emotional_response",
        "title": "Exhibits an understanding of the emotional",
        "type": "string",
        "sort": false,
        "filter": false,
        "visible": true
      },
      {
        "key": "emotional_reasoning",
        "title": "Shares the reason",
        "type": "string",
        "sort": false,
        "filter": false,
        "visible": true
      },
      {
        "key": "emotional_resolution",
        "title": "Makes strategies for minor conflict management",
        "type": "string",
        "sort": false,
        "filter": false,
        "visible": true
      },
      {
        "key": "created_at",
        "title": "Created At",
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
        "visible": false
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
      {
        name: "child_assessment_type", type: "select", title: "Assessment Type",
        optionsArray: [
          { name: "Baseline", id: "1" },
          { name: "Endline 1", id: "2" },
          { name: "Endline 2", id: "3" }
        ]
      },
      { name: "ben_name", type: "text", title: "Beneficiary name" },
      { name: "volunteer_name", type: "text", title: "Volunteer name" },
      { name: "school_name", type: "text", title: "School name" },
      {
        name: "class", type: "select", title: "Class",
        optionsArray: [
          { name: "I", id: "1" },
          { name: "II", id: "2" },
          { name: "III", id: "3" },
          { name: "IV", id: "4" },
          { name: "V", id: "5" },
          { name: "VI", id: "6" },
          { name: "VII", id: "7" },
          { name: "VIII", id: "8" },
          { name: "IX", id: "9" },
          { name: "X", id: "10" },
        ]
      },
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
      title="BSA SEEL Baseline Endline"
      btnTitle=""
      href=""
      className={classes.root}
      csvTitle={"Baseline endline"}
      downloadUrl="baseline-endline/csv"
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
