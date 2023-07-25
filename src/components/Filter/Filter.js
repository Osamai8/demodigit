import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Grid, TextField } from "@material-ui/core";

const CommonSearch = ({ filterData }) => {
    const { fields, onSubmit, onReset } = filterData;

    const firstMount = useRef(true);
    const [formData, setFormData] = useState({});


    const handleChange = (e) => {
        e.persist();
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const createFormData = () => {
        fields.forEach((field) => {
            if (["text", "number"].includes(field.type)) {
                setFormData((prev) => ({ ...prev, [field.name]: "" }));
            } else if (field.type === "select") {
                setFormData((prev) => ({ ...prev, [field.name]: "" }));
            } else if (field.type === "multiselect") {
                setFormData((prev) => ({ ...prev, [field.name]: [] }));
            } else if (field.type === "date") {
                setFormData((prev) => ({ ...prev, [field.name]: [] }));
            }
        });
    }


    useEffect(() => {
        if (firstMount.current && fields.length) createFormData();

        return () => firstMount.current = false;
    }, [fields]);

    const resetConnectedFields = (field, value) => {
        let copiedForm = { ...formData };
        field?.reset?.map(elem => {
            copiedForm[elem] = "";
            return [];
        });
        setFormData({ ...copiedForm, [field.name]: value });
    };

    return (
        <Box>
            <Grid container spacing={3}>
                {fields.length > 0 &&
                    fields.map((field, i) => {
                        return (
                            <Grid item md={3} xs={12} key={i} >
                                {field.type === "select" ? (
                                    <TextField
                                        onChange={e => {
                                            if (field.reset !== undefined) resetConnectedFields(field, e.target.value);
                                            else setFormData({ ...formData, [field['name']]: e.target.value || "" });
                                            field?.onChange && field?.onChange(e.target.value || "");

                                        }}
                                        label={field.title}
                                        select
                                        value={formData[field.name] || field.value || ""}
                                        fullWidth
                                        SelectProps={{ native: true }}
                                        variant="outlined"
                                        size="small"
                                        disabled={field.disabled || false}
                                        key={field.name}
                                        style={{ background: "#fff" }}
                                    >
                                        <option value=""></option>
                                        {field?.optionsArray?.length &&
                                            field?.optionsArray?.map((el) => (
                                                <option value={el.id}>{el.name}</option>
                                            ))}
                                    </TextField>
                                ) : (
                                    <TextField
                                        key={field.name}
                                        fullWidth
                                        label={field.title}
                                        name={field.name}
                                        size="small"
                                        type={field.type}
                                        autoComplete="off"
                                        style={{ background: "#fff" }}
                                        onChange={handleChange}
                                        variant="outlined"
                                        value={formData[field.name] || ""}
                                        onWheel={e => e.preventDefault()}
                                    />
                                )}
                            </Grid>
                        );
                    })}
                {fields?.length > 0 && (
                    <Grid item xs={12} md={12} >
                        <Button
                            onClick={() => onSubmit(formData)}
                            variant="contained"
                            size="small"
                            color="primary"
                            style={{ marginRight: "1rem" }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                onReset();
                                createFormData();
                            }}
                            variant="contained"
                            size="small"
                        >
                            Reset
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default CommonSearch;
