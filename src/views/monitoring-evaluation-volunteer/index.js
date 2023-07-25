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

const MonitoringEvaluationVolunteer = () => {
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
        "limit": ""
    });
    const [stateList, setStateList] = useState([]);
    const [districtList, setDistrictList] = useState([]);

    const limitSet = (limit) => {
        setLimit(limit)
    };

    const pageSet = (limit) => {
        setPage(limit)
    };

    const ListData = async (filters) => {
        setIsLoading(true)
        let url = `${baseUrl}monitoring_evaluation_volunteer/list${filterUrl(filters)}`;
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
                "key": "",
                "title": "Action",
                "type": "Button",
                "sort": false,
                "visible": true
            },

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
            "view": '/app/monitoring-evaluation-volunteer/view'
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
                reset: ["district_id"]
            },
            { name: "district_id", type: "select", title: "District", optionsArray: districtList, },
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
            title="Khushaal Bachpan Abhiyan/Monitoring Evaluation Form for Volunteer"
            btnTitle=""
            href=""
            className={classes.root}
            csvTitle="Monitoring Evaluation Volunteer"
            downloadUrl="monitoring_evaluation_volunteer/csv"
            csvFilters={{ ...filters }}
            filterData={filterData}
        >
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
            <TableList tableData={tableData} />
        </Page >
    )
}

export default MonitoringEvaluationVolunteer;