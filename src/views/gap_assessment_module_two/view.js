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

const GapAssessmentTwoView = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const FetchedData = async (id) => {
        setIsLoading(true);
        let url = `${baseUrl}gap_assessment_Two/list?id=${id}`;
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
                "key": "record_upto_date",
                "title": "Are records and registers well-maintained and up to date?",
                "type": "string",
                "visible": true
            },
            {
                "key": "record_upto_date_other",
                "title": "Please specify Other records and registers well-maintained and up to date?",
                "type": "string",
                "visible": true
            },
            {
                "key": "IEC_ava",
                "title": "Is IEC (Information, Education and Communication) Materials is available on Health and Nutrition?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_prog_03",
                "title": "What are the programs delivered at Anganwadi Centre for Children Aged 0 to 3 Years?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_prog_36",
                "title": "What are the programs delivered at Anganwadi Centre for Children Aged 3 to 6 Years?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_prog_girls",
                "title": "What are the programs delivered at Anganwadi Centre for Adolescent Girls?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_prog_pregwom",
                "title": "What are the programs delivered at Anganwadi Centre for Pregnant Women?",
                "type": "string",
                "visible": true
            },
            {
                "key": "last_train_date",
                "title": "When was the last training conducted?",
                "type": "string",
                "visible": true
            },
            {
                "key": "malnutrition_fact",
                "title": "What are the common factors/reasons for malnutrition? ",
                "type": "string",
                "visible": true
            },
            {
                "key": "malnutrition_fact_other",
                "title": "Please specify other factors/reasons for malnutrition? ",
                "type": "string",
                "visible": true
            },
            {
                "key": "ebf_benefits_child",
                "title": "What are the benefits of EBF (Exclusive Breastfeeding) for both Children?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ebf_benefits_child_other",
                "title": "Please specify other benefits of EBF (Exclusive Breastfeeding) for both Children?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ebf_benefits_mother",
                "title": "What are the benefits of EBF (Exclusive Breastfeeding) for mothers?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ebf_benefits_mother_other",
                "title": "Please specify other benefits of EBF (Exclusive Breastfeeding) for mothers?",
                "type": "string",
                "visible": true
            },
            {
                "key": "",
                "title": "How frequently VHSND (Village Health Sanitation and Nutrition Day) take place at Anganwadi Centre?",
                "type": "string",
                "visible": true
            },
            {
                "key": "imp_day",
                "title": "Celebrated any important/special days related to Nutrition, Health, and Education in last one year?",
                "type": "string",
                "visible": true
            },
            {
                "key": "spcl_occasion",
                "title": "Please mention the occasion?(Special days)",
                "type": "string",
                "visible": true
            },
            {
                "key": "chlrn_breastfeed_und3",
                "title": "How many Children under age 3 years breastfed within one hour of birth?",
                "type": "string",
                "visible": true
            },
            {
                "key": "chlrn_breastfeed_und6",
                "title": "How many Children under age 6 months exclusively breastfed?",
                "type": "string",
                "visible": true
            },
            {
                "key": "chlrn_breastfeed_623",
                "title": "How many Breastfeeding children age 6-23 months receiving an adequate diet?",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_total_chld_count",
                "title": "Total No of Children registered at Anganwadi Centre",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_total_06_mnth_chld",
                "title": "Total no of children aged 0-6 months registered at Anganwadi.",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_total_623_mnth_chld",
                "title": "Total no of children aged 6-23 months registered at Anganwadi.",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_total_03_yr_chld",
                "title": "Total no of children aged 0-3 years registered at Anganwadi.",
                "type": "string",
                "visible": true
            },
            {
                "key": "male_undweight_count",
                "title": "Total No of Male Children who are Underweight",
                "type": "string",
                "visible": true
            },
            {
                "key": "female_undweight_count",
                "title": "Total No of Female Children who are Underweight",
                "type": "string",
                "visible": true
            },
            {
                "key": "male_sam_count",
                "title": "Total No of Male Children with Severe Acute Malnutrition (SAM) with Severly underweight ",
                "type": "string",
                "visible": true
            },
            {
                "key": "female_sam_count",
                "title": "Total No of Female Children with Severe Acute Malnutrition (SAM) with Severly underweight ",
                "type": "string",
                "visible": true
            },
            {
                "key": "total_sam_ref_count",
                "title": "Total No of Children with SAM referred to NRC/MTC ",
                "type": "string",
                "visible": true
            },
            {
                "key": "male_mam_count",
                "title": "Total No of Male Children with Moderate acute malnutrition",
                "type": "string",
                "visible": true
            },
            {
                "key": "female_mam_count",
                "title": "Total No of Male Children with Moderate acute malnutrition",
                "type": "string",
                "visible": true
            },
            {
                "key": "male_stun_count",
                "title": "Total No of Male Children who are stunted ",
                "type": "string",
                "visible": true
            },
            {
                "key": "female_stun_count",
                "title": "Total No of Female Children who are stunted ",
                "type": "string",
                "visible": true
            },
            {
                "key": "pregwom_count",
                "title": "Total No of Pregnant women registered in Anganwadi",
                "type": "string",
                "visible": true
            },
            {
                "key": "adolg_count",
                "title": "Total No of Adolescent girls registered in Anganwadi",
                "type": "string",
                "visible": true
            },
            {
                "key": "servicedel_chall",
                "title": "Please mention any three challenges that affects your service delivery",
                "type": "string",
                "visible": true
            },
            {
                "key": "addressing_malnutrition",
                "title": "Please mention, any district or state specific program for addressing malnutrition",
                "type": "string",
                "visible": true
            },
            {
                "key": "total_chld_36_yr_awc",
                "title": "Total No of 3-6  years Children enrolled at AWC for Pre School Education  ",
                "type": "string",
                "visible": true
            },
            {
                "key": "ang_total_wrkr_prnt",
                "title": "No. of AWCs conducting Anganwadi workers-Parents meeting ",
                "type": "string",
                "visible": true
            },
            {
                "key": "hours_spent_eca",
                "title": "How many hours spent for Early childhood Education activities per day?",
                "type": "string",
                "visible": true
            },
            {
                "key": "child_portfolio",
                "title": "Child portfolio or progress card for each child is maintained at regular basis.",
                "type": "string",
                "visible": true
            },
            {
                "key": "capacity_check",
                "title": "Have you been given any capacity building/training program in last one year?",
                "type": "string",
                "visible": true
            },
            {
                "key": "capacity_check_other",
                "title": "Please specify other capacity building/training programs.",
                "type": "string",
                "visible": true
            },
            {
                "key": "capacity_theme",
                "title": "Please specify the Theme of capacity building/training program",
                "type": "string",
                "visible": true
            },
            {
                "key": "know_more_topic",
                "title": "To improve/better of your service delivery on which topic do you like to know more?",
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
        <Page className={classes.root} href="/app/gap-assessment-two/list" title="Gap Assessment Two View">
            {fetchedData.length && (<ViewData objView={objView} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}

export default GapAssessmentTwoView