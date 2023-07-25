import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Divider,
  CardContent,
  Card,
  CircularProgress,
} from "@material-ui/core";
import Page from "src/components/Page";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import {
  languagesCreateAction,
  languagesListAction,
  languagesUpdateAction,
} from "src/Redux/Languages/action";

const LanguagesForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [ben, setBen] = useState([]);

  const languages = useSelector((state) => state.languages.data);
  const redirectToNewPage = useSelector(
    (state) => state.languages.redirectToNewPage
  );

  useEffect(() => {
    setBen(languages?.data);
  }, [languages]);

  useEffect(() => {
    if (redirectToNewPage) {
      navigate("/app/languages/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToNewPage]);

  return (
    <Page
      href="/app/languages/list"
      title={`Languages ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data["id"] = params.id;
                dispatch(languagesUpdateAction(data));
              } else {
                dispatch(languagesCreateAction(data));
              }
            }}
          >
            {function Render({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
              setFieldValue,
              resetForm,
            }) {
              useEffect(() => {
                if (params.id) dispatch(languagesListAction({ id: params.id }));
              }, []);

              useEffect(() => {
                if (params.id && ben?.length > 0) {
                  const d = ben[0];
                  const fields = ["name"];

                  fields.forEach((field) => {
                    setFieldValue(field, d[field], false);
                  });
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [ben]);

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="Name"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.name}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box display="flex" p={2}>
                      <Button
                        style={{
                          marginRight: "8px",
                        }}
                        disabled={isSubmitting ? true : false}
                        size="medium"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        {isSubmitting ? (
                          <CircularProgress color="success" size={16} />
                        ) : (
                          "Submit"
                        )}
                      </Button>
                      <Button onClick={() => resetForm()} variant="contained">
                        <RotateLeftIcon />
                        Reset
                      </Button>
                    </Box>
                  </Card>
                </form>
              );
            }}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};
export default LanguagesForm;
