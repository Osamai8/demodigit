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

const MonitoringEvaluationStaffView = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const FetchedData = async (id) => {
        setIsLoading(true);
        let url = `${baseUrl}monitoring_evaluation_staff/list?id=${id}`;
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
                "key": "ang_centre",
                "title": "Please enter number of Anganwadi Center in this district.",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_centre_identified",
                "title": "Please enter number of Demo Anganwadi Center identified",
                "type": "string",
                "visible": true
            },
            {
                "key": "demo_ang_camp_launch",
                "title": "Please enter number of Demo Anganwadi Center where camapign is launched.",
                "type": "string",
                "visible": true
            },
            {
                "key": "cap_build_session_for_supervisior",
                "title": "Please enter number of Capacity building sessions held for Anganwadi Supervisor/Lady Supervisor.",
                "type": "string",
                "visible": true
            },
            {
                "key": "supervisior_trained_through_session",
                "title": "Please enter number of  Anganwadi Supervisor/Lady Supervisor trained through session",
                "type": "string",
                "visible": true
            },
            {
                "key": "champ_supervisior_identified",
                "title": "Please enter number of Champion of Change Anganwadi Supervisor/Lady Supervisor identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "cap_build_for_ang_worker",
                "title": "Please enter number of capacity building of the Anganwadi Workers of selected Anganwadi Centers.",
                "type": "string",
                "visible": true
            },
            {
                "key": "champ_ang_worker_identified",
                "title": "Please enter number of Champion of Change Anganwadi Worker identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "review_meeting_conduted",
                "title": "Please enter number of review meeting conducted.",
                "type": "string",
                "visible": true
            },
            {
                "key": "panchayat_identified",
                "title": "Total number of Panchayat Raj Institutions (Gram Panchayat/Ward/Panchayat members) Identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "panchayat_oriented",
                "title": "Total Panchayat Raj Institutions (Gram Panchayat/Ward/Panchayat members) Oriented.",
                "type": "string",
                "visible": true
            },
            {
                "key": "panchayat_onboarded",
                "title": "Total Panchayat Raj Institutions (GP/Ward/Panchayat members) Onboarded",
                "type": "string",
                "visible": true
            },
            {
                "key": "faith_lead_identified",
                "title": "Total number of Faith leaders identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "faith_lead_oriented",
                "title": "Total number of Faith leaders oriented.",
                "type": "string",
                "visible": true
            },
            {
                "key": "faith_lead_onboarded",
                "title": "Total number of Faith leaders onboarded.",
                "type": "string",
                "visible": true
            },
            {
                "key": "tribal_lead_identified",
                "title": "Total number of Tribal Leaders Identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "tribal_lead_oriented",
                "title": "Total number of Tribal Leaders Oriented.",
                "type": "string",
                "visible": true
            },
            {
                "key": "tribal_lead_onboarded",
                "title": "Total number of Tribal Leaders Onboarded.",
                "type": "string",
                "visible": true
            },
            {
                "key": "self_help_grp_identified",
                "title": "Total number of Self Help Groups Identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "self_help_grp_oriented",
                "title": "Total number of Self Help Groups Oriented",
                "type": "string",
                "visible": true
            },
            {
                "key": "self_help_grp_onboarded",
                "title": "Total number of Self Help Groups Onboarded.",
                "type": "string",
                "visible": true
            },
            {
                "key": "volunteer_identified",
                "title": "Total number of Volunteers Identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "volunteer_oriented",
                "title": "Total number of Volunteers Oriented.",
                "type": "string",
                "visible": true
            },
            {
                "key": "volunteer_onboarded",
                "title": "Total number of Volunteers Onboarded.",
                "type": "string",
                "visible": true
            },
            {
                "key": "hyperlocal_ngo_identified",
                "title": "Total number of Hyperlocal NGOs Identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "hyperlocal_ngo_oriented",
                "title": "Total number of Hyperlocal NGOs Oriented.",
                "type": "string",
                "visible": true
            },
            {
                "key": "hyperlocal_ngo_onboarded",
                "title": "Total number of Hyperlocal NGOs Onboarded.",
                "type": "string",
                "visible": true
            },
            {
                "key": "local_media_identified",
                "title": "Total number of  Local Media Identified.",
                "type": "string",
                "visible": true
            },
            {
                "key": "local_media_oriented",
                "title": "Total number of  Local Media Oriented.",
                "type": "string",
                "visible": true
            },
            {
                "key": "local_media_onboarded",
                "title": "Total number of Local Media Onboarded.",
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
        <Page className={classes.root} href="/app/monitoring-evaluation-staff/list" title="Monitoring Evaluation Form for Staff">
            {fetchedData.length && (<ViewData objView={objView} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}


export default MonitoringEvaluationStaffView;