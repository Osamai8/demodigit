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

const MonitoringEvaluationVolunteerView = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const FetchedData = async (id) => {
        setIsLoading(true);
        let url = `${baseUrl}monitoring_evaluation_volunteer/list?id=${id}`;
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
                "key": "learning_session_by_anganwadi_worker",
                "title": "Total number of learning session conducted by Anganwadi Workers for 3-6  years children.",
                "type": "string",
                "visible": true
            },
            {
                "key": "parents_anganwadi_worker_meeting",
                "title": "Total number of Parents and Anganwadi Worker meeting conducted.",
                "type": "string",
                "visible": true
            },
            {
                "key": "children_benefitted_by_sessions_at_anganwadi_centre",
                "title": "Total number of children benefitted through learning session at Anganwadi Centers. ",
                "type": "string",
                "visible": true
            },
            {
                "key": "sessions_held_at_demo_angancentre_comlevel_vhsnd_level",
                "title": "Total Number of Sessions held at Demo Anganwadi Center, Community level, and Village Health Sanitation Nutrition Day(VHSND) level.",
                "type": "string",
                "visible": true
            },
            {
                "key": "benef_participated_at_awc",
                "title": "No. of beneficiaries participated at AWC ",
                "type": "string",
                "visible": true
            },
            {
                "key": "benef_participated_at_community_level",
                "title": "No. of beneficiaries participated at Community level",
                "type": "string",
                "visible": true
            },
            {
                "key": "benef_participated_at_vhsnd",
                "title": "No. of beneficiaries participated at VHSND level",
                "type": "string",
                "visible": true
            },
            {
                "key": "community_based_events",
                "title": "Type of Community based events / Special Events (Specify name)",
                "type": "string",
                "visible": true
            },
            {
                "key": "community_based_events_specify_others",
                "title": "Please specify other community based events/special events.",
                "type": "string",
                "visible": true
            },
            {
                "key": "no_of_events",
                "title": "No. of events",
                "type": "string",
                "visible": true
            },
            {
                "key": "community_member_participated",
                "title": "Total Number of community members participated",
                "type": "string",
                "visible": true
            },
            {
                "key": "channel_members_participated",
                "title": "No. of  channel members participated",
                "type": "string",
                "visible": true
            },
            {
                "key": "equipment_supplies_available_in_good_working_condition",
                "title": "Are the following Equipment /supplies available in good working condition?",
                "type": "string",
                "visible": true
            },
            {
                "key": "equipment_supplies_available_in_good_working_condition_others",
                "title": "Please specify Other Equipment /supplies available in good working condition?",
                "type": "string",
                "visible": true
            },
            {
                "key": "children_registered_at_anganwadi_centre",
                "title": "Total No of Children registered at Anganwadi Centre",
                "type": "string",
                "visible": true
            },
            {
                "key": "underweight_male_children",
                "title": "Total No of Male Children who are Underweight",
                "type": "string",
                "visible": true
            },
            {
                "key": "underweight_female_children",
                "title": "Total No of Female Children who are Underweight",
                "type": "string",
                "visible": true
            },
            {
                "key": "sam_with_severe_underweight_male_children",
                "title": "Total No of male Children with Severe Acute Malnutrition (SAM) with Severly underweight",
                "type": "string",
                "visible": true
            },
            {
                "key": "sam_with_severe_underweight_female_children",
                "title": "Total No of female Children with Severe Acute Malnutrition (SAM) with Severly underweight",
                "type": "string",
                "visible": true
            },
            {
                "key": "children_with_sam_ref_nrc_mtc",
                "title": "Total No of Children with SAM referred to NRC/MTC ",
                "type": "string",
                "visible": true
            },
            {
                "key": "mam_male_children",
                "title": "Total No of male Children with Moderate acute malnutrition",
                "type": "string",
                "visible": true
            },
            {
                "key": "mam_female_children",
                "title": "Total No of female Children with Moderate acute malnutrition",
                "type": "string",
                "visible": true
            },
            {
                "key": "stunted_male_children",
                "title": "Total No of male Children who are stunted ",
                "type": "string",
                "visible": true
            },
            {
                "key": "stunted_female_children",
                "title": "Total No of female Children who are stunted ",
                "type": "string",
                "visible": true
            },
            {
                "key": "pregnant_woman",
                "title": "Total No of Pregnant women ",
                "type": "string",
                "visible": true
            },
            {
                "key": "adolescent_girls",
                "title": "Total No of Adolescent girls ",
                "type": "string",
                "visible": true
            },
            {
                "key": "hours_spent_for_early_childhood_edu_activities_per_day",
                "title": "How many hours spent for Early childhood Education activities per day?",
                "type": "string",
                "visible": true
            },
            {
                "key": "child_progress_card_maintained_regularly",
                "title": "Child portfolio or progress card for each child is maintained at regular basis.",
                "type": "string",
                "visible": true
            },
            {
                "key": "angworker_parents_meet_held_at_awc",
                "title": "Is Anganwadi Workers- parents Meeting being held at AWCs (ex. PTM) ",
                "type": "string",
                "visible": true
            },
            {
                "key": "when_last_meet_held",
                "title": "When was the last meeting held?",
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
        <Page className={classes.root} href="/app/monitoring-evaluation-volunteer/list" title="Monitoring Evaluation Form for Volunteer">
            {fetchedData.length && (<ViewData objView={objView} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}


export default MonitoringEvaluationVolunteerView;