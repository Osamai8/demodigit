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
import {
  blockListAction,
  createBlockAction,
  updateBlockAction,
} from "src/Redux/Block/action";
import { DistrictListAction } from "src/Redux/District/action";
import { StateList } from "src/Redux/State/action";

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const block = useSelector((state) => state.Block);
  const statesData = useSelector((state) => state.State.data);

  useEffect(() => {
    if (block.redirectToNewPage) {
      navigate("/app/block/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block]);

  useEffect(() => {
    dispatch(StateList({ fetched: "All" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      href="/app/block/list"
      title={`Block ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              name: "",
              state_id: "",
              district_id: "",
              code: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Block name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              district_id: Yup.number()
                .integer()
                .required("District name is required"),
              code: Yup.string().required("Code is required"),
              state_id: Yup.number()
                .integer()
                .required("State name is required"),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data["id"] = parseInt(params.id);
                dispatch(updateBlockAction(data));
              } else {
                dispatch(createBlockAction(data));
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
              useEffect(() => {
                if (id) {
                  dispatch(blockListAction({ id }));
                  stateChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);
              const data = useSelector((state) => {
                return state.Block.data;
              });

              useEffect(() => {
                if (data.data !== undefined && data.data.length && id) {
                  let d = data.data[0];
                  const fields = ["state_id", "district_id", "code", "name"];
                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [data]);

              const stateChange = async (e) => {
                let stateId = "";
                if (e !== undefined && e.target.value) {
                  stateId = e.target.value;
                  setFieldValue("state_id", e.target.value, false);
                } else {
                  stateId = values.state_id;
                }
                dispatch(
                  DistrictListAction({ fetched: "All", state_id: stateId })
                );
              };
              const districtData = useSelector((state) => {
                return state.District.data;
              });

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <>
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.state_id && errors.state_id
                              )}
                              fullWidth
                              helperText={touched.state_id && errors.state_id}
                              label="Select state"
                              name="state_id"
                              onChange={(e) => stateChange(e)}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.state_id}
                              variant="outlined"
                            >
                              <option value=""></option>
                              {statesData.data !== undefined &&
                                statesData.data.map((el) => (
                                  <option key={el.id} value={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                            </TextField>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.district_id && errors.district_id
                              )}
                              fullWidth
                              helperText={
                                touched.district_id && errors.district_id
                              }
                              label="Select district"
                              name="district_id"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.district_id}
                              variant="outlined"
                            >
                              <option value=""></option>
                              {districtData.data !== undefined &&
                                districtData.data.map((el) => (
                                  <option key={el.id} value={el.id}>
                                    {el.name}
                                  </option>
                                ))}
                            </TextField>
                          </Grid>
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(touched.name && errors.name)}
                              fullWidth
                              helperText={touched.name && errors.name}
                              label="Block Name"
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
                              label="Block code"
                              name="code"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              value={values.code}
                              variant="outlined"
                            />
                          </Grid>
                        </>
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
export default UserForm;
