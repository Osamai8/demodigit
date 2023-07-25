import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  CardContent,
  Card,
} from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import { domainListAction } from "src/Redux/Domain/action";
import {
  subDomainListAction,
  subDomainUpdateAction,
  suDomainCreateAction,
} from "src/Redux/SubDomain/action";

const SubDomainForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const subDomain = useSelector((state) => state.SubDomain);

  useEffect(() => {
    if (subDomain.redirectToNewPage) {
      navigate("/app/sub_domain/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subDomain]);

  return (
    <Page
      href="/app/sub_domain/list"
      title={`Sub Domain ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              domain_id: "",
              name: "",
            }}
            validationSchema={Yup.object().shape({
              domain_id: Yup.string().required("Domain Name is required"),
              name: Yup.string()
                .required("Subdomain name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data["id"] = parseInt(params.id);
                dispatch(subDomainUpdateAction(data));
              } else {
                dispatch(suDomainCreateAction(data));
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
                dispatch(domainListAction({ fetched: "All" }));
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const domains = useSelector((state) => state.Domain);

              // useEffect(() => {
              //   console.log("Domains: ", domains);
              //   // eslint-disable-next-line react-hooks/exhaustive-deps
              // }, [domains]);

              useEffect(() => {
                if (params.id) dispatch(subDomainListAction({ id: params.id }));
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const { data } = useSelector((state) => state.SubDomain);

              useEffect(() => {
                if (data.data?.length && params.id) {
                  let d = data.data[0];
                  const fields = ["name", "domain_id"];
                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [data]);
              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        {domains?.data.data ? (
                          <>
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.domain_id && errors.domain_id
                                )}
                                fullWidth
                                helperText={
                                  touched.domain_id && errors.domain_id
                                }
                                label="Select Domain"
                                name="domain_id"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.domain_id}
                                variant="outlined"
                              >
                                <option value=""></option>
                                {domains.data.data.map((obj) => (
                                  <option key={obj.id} value={obj.id}>
                                    {obj.name}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.name && errors.name)}
                                fullWidth
                                helperText={touched.name && errors.name}
                                label="Sub Domain Name"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.name}
                                variant="outlined"
                              />
                            </Grid>
                          </>
                        ) : (
                          <h2>Please create domain first</h2>
                        )}
                      </Grid>
                    </CardContent>
                    <Box display="flex" p={2}>
                      <Button
                        style={{
                          marginRight: "8px",
                        }}
                        size="medium"
                        type="submit"
                        variant="contained"
                        color="primary"
                      >
                        Submit
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
export default SubDomainForm;
