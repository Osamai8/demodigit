import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react'
import { useState, useEffect } from 'react';
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

const ChildAssessmentToolView = () => {
    const { id } = useParams();
    const classes = useStyles();
    const [fetchedData, setFetchedData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const FetchedData = async (id) => {
        setIsLoading(true);
        let url = `${baseUrl}child_assessment_tool/list?id=${id}`;
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
                "key": "child_assessment_type",
                "title": "Child Assessment Type",
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
                "key": "code",
                "title": "Anganwadi Centre Code ",
                "type": "string",
                "visible": true
            },
            {
                "key": "ben_name",
                "title": "Name of Child",
                "type": "string",
                "visible": true
            },
            {
                "key": "gender",
                "title": "Gender of Child",
                "type": "string",
                "visible": true
            },
            {
                "key": "age",
                "title": "Age of Child(years)",
                "type": "string",
                "visible": true
            },
            {
                "key": "speaker_effective_listener",
                "title": 'Please select marks of "Speaker and effective listener" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "reading_with_comprehension",
                "title": 'Please select marks of "Reading with comprehension" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "pre_Writing_skills",
                "title": 'Please select marks of "Pre-Writing skills" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "early_number_concept",
                "title": 'Please select marks of "Early number concept" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "concepts_of_shapes_and_colour",
                "title": 'Please select marks of "Concepts of shapes and colour" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "cognitive_development",
                "title": 'Please select marks of "Cognitive development" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "sensory_development",
                "title": 'Please select marks of "sensory development" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "gross_motor",
                "title": 'Please select marks of "Gross Motor" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "fine_motor",
                "title": 'Please select marks of "Fine Motor" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "self_awareness",
                "title": 'Please select marks of "Self  Awareness" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "emotion_awareness",
                "title": 'Please select marks of "Emotion Awareness" skill.',
                "type": "string",
                "visible": true
            },
            {
                "key": "relation_building",
                "title": 'Please select marks of "relation building " skill. ',
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
        <Page className={classes.root} href="/app/child-assessment-tool/list" title="Child Assessment Tool View">
            {fetchedData.length && (<ViewData objView={objView} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}

export default ChildAssessmentToolView;