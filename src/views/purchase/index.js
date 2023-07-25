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



const Purchase = () => {
    const classes = useStyles();

    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [lists, setListData] = useState([]);
    const [filters, setFilters] = useState({
        "consent": "",
        "quantity": "",
        "itemId": "",
        "limit": ""
    });
    const limitSet = (limit) => {
        setLimit(limit)
    };

    const pageSet = (limit) => {
        setPage(limit)
    };




    const ListData = async (filterData) => {
        delete filterData.page;
        delete filterData.limit;
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://demodigitapi.dhwaniris.com/egov-wf/purchase/list${filterUrl(filterData)}`,
            headers: {
                'timestamp': '2023-07-21 10:25:06.599',
                'userId': '1'
            }
        };
        setIsLoading(true)
        try {
            let { data } = await axios.request(config)
            if (data?.totalcount) setTotal(0);
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
                "key": "catalogName",
                "title": "Product Name",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "quantity",
                "title": "Quantity",
                "type": "string",
                "sort": false,
                "filter": false,
                "visible": true
            },
            {
                "key": "consent",
                "title": "Consent",
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
            "view": "/app/purchase/view"
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
            { name: "catalogName", type: "text", title: "Product Name" },
        ],
    };

    useEffect(() => {
        ListData({ ...filters, page: page, limit: limit });
    }, [page]);


    return (
        <Page
            title="Purchase"
            btnTitle=""
            href=""
            className={classes.root}
            csvTitle="Download PDF"
            downloadUrl="gap_assessment_two/csv"
            csvFilters={{ ...filters }}
            filterData={filterData}
        >
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
            <TableList tableData={tableData} />
        </Page >
    )
}

export default Purchase;