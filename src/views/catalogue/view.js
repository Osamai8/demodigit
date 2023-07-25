import { Card, CardContent, CircularProgress, Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
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

const CatalogueView = () => {
    const { state } = useLocation();
    const classes = useStyles();
    const [rowCells, setRowCells] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



    useEffect(() => {
        if (state) {
            setIsLoading(false);
            const k = [
                {
                    title: "Name",
                    value: state.name,
                },
                {
                    title: "Description",
                    value: state.description,
                },
                {
                    title: "Price",
                    value: state.price,
                },
                {
                    title: "Image",
                    value: <img src={state?.image} height={115}
                        width={115} alt="product-image" />,
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
        <Page className={classes.root} href="/app/catalogue" title={"Catalogue View"}>
            {state && (<ViewData objView={rowCells} />)}
            {isLoading ? <CircularProgress className="commonLoader" /> : ""}
        </Page>
    )
}

export default CatalogueView;