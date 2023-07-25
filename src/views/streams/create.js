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
  CardHeader,
  Divider,
  CardContent,
  Card,
} from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import { subDomainListAction } from "src/Redux/SubDomain/action";
import { domainListAction } from "src/Redux/Domain/action";
import {
  streamCreateAction,
  streamListAction,
  streamUpdateAction,
} from "src/Redux/Stream/action";

const StreamForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const streams = useSelector((state) => state.Stream);
  const domains = useSelector((state) => state.Domain);
  const subDomains = useSelector((state) => state.SubDomain);

  useEffect(() => {
    if (streams.redirectToNewPage) {
      navigate("/app/stream/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streams]);

  useEffect(() => {
    dispatch(domainListAction({ fetched: "All" }));
  }, [dispatch]);

  return (
    <Page
      href="/app/stream/list"
      title={`Stream ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              name: "",
              domain_id: "",
              sub_domain_id: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Stream name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              domain_id: Yup.string().required("Domain Name is required"),
              sub_domain_id: Yup.string().required(
                "Sub Domain Name is required"
              ),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data["id"] = parseInt(params.id);
                dispatch(streamUpdateAction(data));
              } else {
                dispatch(streamCreateAction(data));
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
                if (params.id) dispatch(streamListAction({ id: params.id }));
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const stream = useSelector((state) => state.Stream.data);

              useEffect(() => {
                if (stream?.data?.length && params.id) {
                  let d = stream.data[0];
                  const fields = ["name", "sub_domain_id"];
                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [stream]);

              useEffect(() => {
                if (values.sub_domain_id) handleDomainChangeChange();
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.sub_domain_id]);

              const handleDomainChangeChange = (e) => {
                let domainId = "";
                if (e?.target.value) {
                  domainId = e.target.value;
                  setFieldValue("domain_id", domainId, true);
                } else {
                  domainId = values.domain_id;
                }
                dispatch(
                  subDomainListAction({ fetched: "All", domain_id: domainId })
                );
              };

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader
                      title={params.id ? "Stream Update" : "Stream Create"}
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.domain_id && errors.domain_id
                            )}
                            fullWidth
                            helperText={touched.domain_id && errors.domain_id}
                            label="Select Domain"
                            name="domain_id"
                            onChange={handleDomainChangeChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.domain_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {domains?.data?.data?.length &&
                              domains.data.data.map((obj) => (
                                <option key={obj.id} value={obj.id}>
                                  {obj.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.sub_domain_id && errors.sub_domain_id
                            )}
                            fullWidth
                            helperText={
                              touched.sub_domain_id && errors.sub_domain_id
                            }
                            label="Select Subdomain"
                            name="sub_domain_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.sub_domain_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {subDomains?.data?.data?.length &&
                              subDomains.data.data.map((obj) => (
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
                            label="Stream Name"
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
export default StreamForm;
