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
  createDistrictAction,
  DistrictListAction,
  updateDistrictAction,
} from "src/Redux/District/action";
import { StateList } from "src/Redux/State/action";

const DistrictForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const districts = useSelector((state) => state.District);
  const states = useSelector((state) => state.State);

  useEffect(() => {
    if (districts.redirectToNewPage) {
      navigate("/app/district/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districts]);

  useEffect(() => {
    dispatch(StateList({ fetched: "All" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      href="/app/district/list"
      title={`District ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              state_id: "",
              name: "",
            }}
            validationSchema={Yup.object().shape({
              state_id: Yup.number()
                .integer()
                .required("State name is required"),
              name: Yup.string()
                .required("District name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data["id"] = parseInt(params.id);
                dispatch(updateDistrictAction(data));
              } else {
                dispatch(createDistrictAction(data));
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
                if (params.id) dispatch(DistrictListAction({ id: params.id }));
              }, []);

              const { data } = useSelector((state) => {
                return state.District;
              });

              // useEffect(() => {
              //   console.log("STates: ", states);
              // }, [states]);

              useEffect(() => {
                if (data.data?.length && params.id) {
                  let d = data.data[0];
                  const fields = ["state_id", "name"];
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
                      {states.data.data?.length > 0 ? (
                        <Grid container spacing={3}>
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.state_id && errors.state_id
                              )}
                              fullWidth
                              helperText={touched.state_id && errors.state_id}
                              label="Select State"
                              name="state_id"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.state_id}
                              variant="outlined"
                            >
                              <option value=""></option>
                              {states.data.data.map((obj) => (
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
                              label="District Name"
                              name="name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              value={values.name}
                              variant="outlined"
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <h2>No State yet, please add state first</h2>
                      )}
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
export default DistrictForm;
