import { CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
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



const FarmerSurvey = () => {
    const classes = useStyles();

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [lists, setListData] = useState([]);
    const [filters, setFilters] = useState({
        "partner": "",
        "state": "",
        "district": "",
        "cluster": "",
        "block": "",
        "village": "",
        "limit": "10"
    });
    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [blockList, setBlockList] = useState([]);
    const [clusterList, setClusterList] = useState([]);

    const pageSet = (limit) => {
        setPage(limit)
    };

    const ListData = async (filterData) => {
        filterData['skip'] = (filterData.page - 1) * 10 || 0;
        filterData['limit'] = limit;
        delete filterData.page;
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://uatmformv2services.dhwaniris.in/admin-service/form_data/sepration/64b5064d21e5cdb31912b3d2${filterUrl(filterData)}`,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
                'Content-Type': 'application/json',
                'organisation': '64b4f851b991845b924c923c',
                'project': '64b4f96721e5cdb31912b1d0',
                'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE4YWUzYzA1ZWI3YTBhMDkxNTJjYiIsImxvZ2luSWQiOiI2NGJiN2JmMGExMTAzNGI5NzYwZDVmNjciLCJuYW1lIjoiTmloYWFuIE1vaGFtbWVkIChBbmFseXN0KSIsImVtYWlsIjoibmloYWFuLm1vaGFtbWVkQGRod2FuaXJpcy5jb20iLCJtb2JpbGUiOiI4Njc0NTM0MjkwIiwidXNlclR5cGUiOiJBRE1JTiIsIm9yZ0lkcyI6W10sImxvZ2luTm8iOjEsImlhdCI6MTY5MDAwODU2MDI5OCwiZXhwIjo1NzY3NzIwODU2MDI5OH0.Ywy0jSl92ZvSPkL1CVC2ERWfRRAbGezbNaPi5-SVfn0'
            }
        };
        setIsLoading(true)

        let url = `https://uatmformv2services.dhwaniris.in/admin-service/form_data/sepration/64b5064d21e5cdb31912b3d2${filterUrl(filters)}`;
        try {
            let data = await axios.request(config)

            const newArr = data?.data?.data?.map((elem, index) => {
                let p = {
                    id: elem?._id || index,
                    partner: elem?.surveyorInfo?.name,
                    mobileNumber: elem?.surveyorInfo?.mobile,
                    state: elem?.state?.name,
                    district: elem?.district?.name,
                    block: elem?.block?.name,
                    gramPanchayat: elem?.gramPanchayat?.name,

                }
                return p;
            });
            setListData(newArr);
            if (data?.data) setTotal(data?.data?.total);

        } catch (error) {
            toast.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    const resetFilterHandler = () => {
        let clonedFilter = { ...filters };
        for (let elem in clonedFilter) {
            if (elem === "limit") clonedFilter[elem] = limit;
            else clonedFilter[elem] = "";
        }
        setFilters(clonedFilter);
        if (page === 1) ListData({ page: 1 });
        else setPage(1);
    }

    let tableData = {
        sortField: {},
        tableConfig: [
            {
                "key": "mobileNumber",
                "title": "Mobile Number",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "state",
                "title": "State",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "district",
                "title": "District",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "block",
                "title": "Block",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "gramPanchayat",
                "title": "Gram panchayat",
                "type": "string",
                "sort": false,
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
            "view": "/app/farmer_survey/view"
            // "view": "https://uatmformv2services.dhwaniris.in/admin-service/clientformdatabyid/64ba77e1d7f6a38fb1ad8c31"
        },
        isPagination: true,
        eventLister: {
            ListData,
            // deleteItem
        }
    };

    const filterData = {
        onSubmit: (data) => {
            setFilters({ ...filters, ...data });
            if (page !== 1) setPage(1);
            else ListData({ ...filters, ...data, page: 1, limit: filters.limit });
        },
        onReset: () => resetFilterHandler(),
        fields: [
            {
                name: "state", type: "select", title: " ", optionsArray: stateList, disabled: true, value: "12",
                onChange: (value) => fetchApi("district/list", setDistrictList, { state_id: value, fetched: "All" }),
                reset: ["district", "block", "cluster", "village"]
            },
            {
                name: "district", type: "select", title: "District", optionsArray: districtList,
                onChange: (value) => fetchApi("block/list", setBlockList, { state_id: "12", district_id: value, fetched: "All" }),
                reset: ["block", "cluster", "village"]
            },
            {
                name: "block", type: "select", title: "Block", optionsArray: blockList,
                onChange: (value) => fetchApi("cluster/list", setClusterList, { state_id: value, district_id: value, block_id: value, fetched: "All" }),
                reset: ["cluster", "village"]
            },
            {
                name: "gramPanchayat", type: "select", title: "Gram Panchayat", optionsArray: clusterList,
            },
        ],
    };

    useEffect(() => {
        ListData({ ...filters, page: page, limit: limit });
    }, [page]);

    useEffect(() => {
        fetchApi("state/list", setStateList, { fetched: "All" });
        fetchApi("district/list", setDistrictList, { state_id: "12", fetched: "All" })
    }, []);


    return (
        <Page
            title="Farmer Survey"
            btnTitle=""
            href=""
            className={classes.root}
            csvTitle="Download PDF"
            downloadUrl="gap_assessment_two/csv"
            csvFilters={{ ...filters }
            }
            filterData={filterData}
        >
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
            <TableList tableData={tableData} />
        </Page >
    )
}

export default FarmerSurvey;