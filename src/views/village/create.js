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
  NativeSelect,
} from "@material-ui/core";
import Page from "src/components/Page";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { fetchWrapper } from "../../services/http_requests";
import { toast } from "react-toastify";

const baseUrl = process.env.REACT_APP_API_URL;
export const VillageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const submitData = async (body, action) => {
    setIsLoading(true);
    try {
      let data = [];
      if (action === "create") {
        data = await fetchWrapper.post(`${baseUrl}village/create`, body);
      } else {
        data = await fetchWrapper.put(
          `${baseUrl}village/update/${body.id}`,
          body
        );
      }
      setIsLoading(false);
      toast.success(data?.data?.message);
      navigate("/app/village/list", { replace: true });
    } catch (error) {
      setIsLoading(false);
      toast.error(error);
    }
  };

  return (
    <Page
      href="/app/village/list"
      title={`Village ${id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={10} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              state_id: "",
              district_id: "",
              block_id: "",
              cluster_id: "",
              name: "",
              code: ""
            }}
            validationSchema={Yup.object().shape({
              state_id: Yup.number().integer().required("State is required"),
              district_id: Yup.number().integer().required("District is required"),
              block_id: Yup.number().integer().required("Block is required"),
              cluster_id: Yup.number().integer().required("Cluster is required"),
              name: Yup.string().required("Village is required"),
              code: Yup.string(),

            })}
            onSubmit={(data) => {
              if (id) {
                data["id"] = parseInt(id);
                submitData(data, "update");
              } else {
                submitData(data, "create");
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
              const { id } = useParams();
              const [listsData, setListData] = useState([]);
              const [stateListData, setStateListData] = useState([]);
              const [districtListData, setDistrictListData] = useState([]);
              const [blockListData, setBlockListData] = useState([]);
              const [clusterListData, setClusterListData] = useState([]);

              useEffect(() => {
                if (id) {
                  ListData(id);
                }
                getStateData();
              }, []);

              const getStateData = async () => {
                let url = `${baseUrl}state/list?fetched=All`;
                try {
                  let data = await fetchWrapper.get(url);
                  setStateListData(data?.data);
                } catch (error) {
                  toast.error(error);
                }
              };
              useEffect(() => {
                if (values.state_id) {
                  getDistrictData(values.state_id);
                }
              }, [values.state_id]);
              const getDistrictData = async (state_id) => {
                let url = `${baseUrl}district/list?state_id=${state_id}&fetched=All`;
                try {
                  let data = await fetchWrapper.get(url);
                  setDistrictListData(data?.data);
                } catch (error) {
                  toast.error(error);
                }
              };
              useEffect(() => {
                if (values.district_id) {
                  getBlockData(values.district_id);
                }
              }, [values.district_id]);

              const getBlockData = async (district_id) => {
                let url = `${baseUrl}block/list?district_id=${district_id}&fetched=All`;
                try {
                  let data = await fetchWrapper.get(url);
                  setBlockListData(data?.data);
                } catch (error) {
                  toast.error(error);
                }
              };
              useEffect(() => {
                if (values.block_id) {
                  getClusterData(values.block_id);
                }
              }, [values.block_id]);

              const getClusterData = async (district_id) => {
                let url = `${baseUrl}cluster/list?block_id=${district_id}&fetched=All`;
                try {
                  let data = await fetchWrapper.get(url);
                  setClusterListData(data?.data);
                } catch (error) {
                  toast.error(error);
                }
              };

              const ListData = async (id) => {
                setIsLoading(true);
                let url = `${baseUrl}village/list?id=${id}`;
                try {
                  let data = await fetchWrapper.get(url);
                  setListData(data?.data);
                  setIsLoading(false);
                } catch (error) {
                  setIsLoading(false);
                  toast.error(error);
                }
              };

              useEffect(() => {
                if (listsData?.length && id) {
                  let d = listsData[0];
                  const fields = [
                    "name",
                    "state_id",
                    "district_id",
                    "block_id",
                    "cluster_id",
                    "code"
                  ];
                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
              }, [listsData]);

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.state_id && errors.state_id
                            )}
                            fullWidth
                            helperText={touched.state_id && errors.state_id}
                            label="Select state"
                            name="state_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.state_id}
                            variant="outlined"
                          >
                            <option value="">Select state</option>
                            {stateListData?.length &&
                              stateListData.map((el) => (
                                <option value={el.id}>{el.name}</option>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.district_id && errors.district_id
                            )}
                            fullWidth
                            onBlur={handleBlur}

                            helperText={
                              touched.district_id && errors.district_id
                            }
                            select
                            SelectProps={{ native: true }}
                            value={values.district_id}
                            name="district_id"
                            required
                            onChange={handleChange}
                            variant="outlined"

                          >
                            <option value="">Select district</option>
                            {districtListData?.length &&
                              districtListData.map((el) => (
                                <option value={el.id}>{el.name}</option>
                              ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.block_id && errors.block_id
                            )}
                            fullWidth
                            select
                            SelectProps={{ native: true }}
                            helperText={
                              touched.block_id && errors.block_id
                            }
                            variant="outlined"
                            value={values.block_id}
                            name="block_id"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select block</option>
                            {blockListData?.length &&
                              blockListData.map((el) => (
                                <option value={el.id}>{el.name}</option>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.cluster_id && errors.cluster_id
                            )}
                            fullWidth
                            select
                            SelectProps={{ native: true }}
                            helperText={
                              touched.cluster_id && errors.cluster_id
                            }
                            variant="outlined"
                            value={values.cluster_id}
                            name="cluster_id"
                            required
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select cluster</option>
                            {clusterListData?.length &&
                              clusterListData.map((el) => (
                                <option value={el.id}>{el.name}</option>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="Village"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.name}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.code && errors.code)}
                            fullWidth
                            helperText={touched.code && errors.code}
                            label="Code"
                            name="code"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.code}
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
                        disabled={isLoading ? true : false}
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
