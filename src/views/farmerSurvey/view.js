import { CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import ViewData from 'src/components/Form/View';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "white",
        minHeight: "100%",
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(10)
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    }
}));

const FarmerView = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://uatmformv2services.dhwaniris.in/admin-service/clientformdatabyid/${id}?formId=1&lng=en`,
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Origin': 'https://uatmformv2.dhwaniris.in',
            'Referer': 'https://uatmformv2.dhwaniris.in/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
            'organisation': '64b4f851b991845b924c923c',
            'project': '64b4f96721e5cdb31912b1d0',
            'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OWE4YWUzYzA1ZWI3YTBhMDkxNTJjYiIsImxvZ2luSWQiOiI2NGJiN2JmMGExMTAzNGI5NzYwZDVmNjciLCJuYW1lIjoiTmloYWFuIE1vaGFtbWVkIChBbmFseXN0KSIsImVtYWlsIjoibmloYWFuLm1vaGFtbWVkQGRod2FuaXJpcy5jb20iLCJtb2JpbGUiOiI4Njc0NTM0MjkwIiwidXNlclR5cGUiOiJBRE1JTiIsIm9yZ0lkcyI6W10sImxvZ2luTm8iOjEsImlhdCI6MTY5MDAwODU2MDI5OCwiZXhwIjo1NzY3NzIwODU2MDI5OH0.Ywy0jSl92ZvSPkL1CVC2ERWfRRAbGezbNaPi5-SVfn0'
        }
    };


    const FetchedData = async (id) => {
        setIsLoading(true);
        try {
            let data = await axios.request(config);
            setFetchedData(data?.data?.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error);
        }
    }

    useEffect(() => {
        if (id) FetchedData(id);
    }, [id]);

    return (
        <Page className={classes.root} href="/app/farmer_survey" title={fetchedData?.title || "Farmer Survey"}>
            {fetchedData?.question?.length && (<ViewData objView={fetchedData?.question} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}

export default FarmerView;