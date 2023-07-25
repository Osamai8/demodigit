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
  Divider,
  CardContent,
  Card,
} from "@material-ui/core";
import Page from "src/components/Page";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import { StateList, create, update } from "src/Redux/State/action";

const StateForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const redirectToNewPage = useSelector((state) => {
    return state.State.redirectToNewPage;
  });

  useEffect(() => {
    if (redirectToNewPage) {
      navigate("/app/state/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToNewPage]);

  return (
    <Page href="/app/state/list" title={`State ${id ? "Update" : "Create"}`}>
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("State is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
            })}
            onSubmit={(data) => {
              if (id) {
                data["id"] = parseInt(id);
                dispatch(update(data));
              } else {
                dispatch(create(data));
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
                  dispatch(StateList({ id }));
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const data = useSelector((state) => {
                return state.State.data;
              });
              const isLoading = useSelector((state) => {
                return state.State.isLoading;
              });
              useEffect(() => {
                if (data.data !== undefined && data.data.length && id) {
                  let d = data.data[0];
                  const fields = ["name"];
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
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.name && errors.name)}
                            fullWidth
                            helperText={touched.name && errors.name}
                            label="State Name"
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
export default StateForm;
