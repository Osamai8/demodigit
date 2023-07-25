import { CircularProgress, makeStyles } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
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

const LoanView = () => {
    const { state } = useLocation();
    const { id } = useParams();
    const classes = useStyles();
    const [rowCells, setRowCells] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (state) {
            setIsLoading(false);
            const k = [

                {
                    title: "Bank Name",
                    value: state.bankName,
                },
                {
                    title: "Branch Name",
                    value: state.branchName,
                },
                {
                    title: "Loan Amount",
                    value: state.loanAmount,
                },
                {
                    title: "Interest Rate(%)",
                    value: state.interestRate,
                },
                {
                    title: "Purpose",
                    value: state.purpose,
                },
                {
                    title: "PAN Number",
                    value: state.pan,
                },
                {
                    title: "Annual Income",
                    value: state.annualIncome,
                },
                {
                    title: "Tenure",
                    value: state.tenure,
                },
                {
                    title: "Created At",
                    value: moment(state.createdDate).format("DD-MM-YYYY") || "",
                },
            ]
            setRowCells(k);
        }
    }, [state]);

    return (
        <Page className={classes.root} href="/app/loan" title={"Loan View"}>
            {state && (<ViewData objView={rowCells} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}

export default LoanView;