import { CircularProgress, makeStyles } from '@material-ui/core';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import ViewData from 'src/components/Form/View';
import Page from 'src/components/Page';
import { fetchWrapper } from 'src/services/http_requests';

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

const GapAssessmentOneView = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const FetchedData = async (id) => {
        setIsLoading(true);
        let url = `${baseUrl}gap_assessment_one/list?id=${id}`;
        try {
            let data = await fetchWrapper.get(url);
            setFetchedData(data?.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error);
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
                "key": "gap_assessment_type",
                "title": "Gap Assessment Type",
                "type": "string",
                "visible": true
            },
            {
                "key": "anganwadi",
                "title": "Anganwadi",
                "type": "string",
                "visible": true
            },
            {
                "key": "avg_contact",
                "title": "Anganwadi Contact Number",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_worker_ava",
                "title": "Anganwadi Worker Available",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_incharge_ava",
                "title": "Is Anganwadi Incharge available?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_help_ava",
                "title": "Is Anganwadi Helper available?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_fun",
                "title": "Where does the Anganwadi Centre function?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_fun_other",
                "title": "Please specify Other where does the Anganwadi Centre function?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_space_ava",
                "title": "Space Availability at Anganwadi Centre",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_space_ava_other",
                "title": "Please specify Other space availability at Anganwadi Centre",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_cond",
                "title": "What is the present condition of the Anganwadi Centre?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_cond_other",
                "title": "Please specify Other present condition of the Anganwadi Centre?",
                "type": "string",
                "visible": true
            },
        ],
    }

    useEffect(() => {
        if (id) {
            FetchedData(id);
        }
    }, [id]);

    let objView = Object.assign(objTable, { data: fetchedData });
    return (
        <Page className={classes.root} href="/app/gap-assessment-one/list" title="Gap Assessment One View">
            {fetchedData.length && (<ViewData objView={objView} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}

export default GapAssessmentOneView;