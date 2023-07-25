import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Box } from 'react-feather';
import { toast } from 'react-toastify';
import TableList from 'src/components/Form/Table';
import Page from 'src/components/Page';
import { fetchWrapper } from 'src/services/http_requests';
import { fetchApi, filterUrl } from 'src/utils/halper';
const baseUrl = process.env.REACT_APP_API_URL;

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        minHeight: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(10),
    }
}));

const GapAssessmentOne = () => {
    const classes = useStyles();

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [lists, setListData] = useState([]);
    const [filters, setFilters] = useState({
        "name": "",
        "state_id": "",
        "district_id": "",
        "cluster_id": "",
        "block_id": "",
        "village_id": "",
        "child_assessment_type": "",
        "anganwadi": "",
        "limit": ""
    });
    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [blockList, setBlockList] = useState([]);
    const [clusterList, setClusterList] = useState([]);
    const [villageList, setVillageList] = useState([]);

    const limitSet = (limit) => {
        setLimit(limit)
    };

    const pageSet = (limit) => {
        setPage(limit)
    };

    const ListData = async (filters) => {
        setIsLoading(true)
        let url = `${baseUrl}gap_assessment_one/list${filterUrl(filters)}`;
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
            "name": "",
            "state": "",
            "district": "",
            "block": "",
            "cluster": "",
            "village": "",
            "anganwadi": ""
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
                "key": "anganwadi",
                "title": "Anganwadi",
                "type": "string",
                "sort": true,
                "filter": false,
                "visible": true
            },
            {
                "key": "gap_assessment_type",
                "title": "Gap Assessment Type",
                "type": "string",
                "filter_data": [
                    { name: "Baseline", id: "1" },
                    { name: "Endline", id: "2" },
                ],
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
            "view": '/app/gap-assessment-one/view'
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
            { name: "anganwadi", type: "text", title: "Anganwadi" },
            {
                name: "child_assessment_type", type: "select", title: "Assessment Type", optionsArray: [{ name: "Baseline", id: "1" },
                { name: "Endline", id: "2" },],
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
            title="Khushaal Bachpan Abhiyan/Gap Assessment One"
            btnTitle=""
            href=""
            className={classes.root}
            csvTitle="Gap Assessment One"
            downloadUrl="gap_assessment_one/csv"
            csvFilters={{ ...filters }}
            filterData={filterData}
        >
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
            <TableList tableData={tableData} />
        </Page >
    )
}

export default GapAssessmentOne;