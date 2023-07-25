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



const Catalogue = () => {
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
        "limit": ""
    });
    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [blockList, setBlockList] = useState([]);
    const [clusterList, setClusterList] = useState([]);

    const limitSet = (limit) => {
        setLimit(limit)
    };

    const pageSet = (limit) => {
        setPage(limit)
    };

    const ListData = async (filterData) => {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `http://localhost:8085/egov-wf/catalog/list${filterUrl(filterData)}`,
        };
        setIsLoading(true)
        delete filterData.page
        try {
            let { data } = await axios.request(config)
            if (data?.totalcount) setTotal(data?.totalcount);
            setListData(data?.wrapperList);
        } catch (error) {
            toast.error(error);
        } finally {
            setIsLoading(false);
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
        sortField: {},
        tableConfig: [
            {
                "key": "name",
                "title": "Name",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "description",
                "title": "Description",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "price",
                "title": "Price",
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
            "view": "/app/catalogue/view"
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
            { name: "name", type: "text", title: "Name" },
        ],
    };

    useEffect(() => {
        ListData({ ...filters, page: page, limit: limit });
    }, [page]);



    return (
        <Page
            title="Catalogue"
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

export default Catalogue;