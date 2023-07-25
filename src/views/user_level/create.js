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
  makeStyles,
  CardHeader,
  Divider,
  CardContent,
  Card,
} from "@material-ui/core";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import {
  userLevelCreateAction,
  userLevelListAction,
  userLevelUpdateAction,
} from "src/Redux/UserLevel/action";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const UserLevelForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const userCreate = useSelector((state) => state.userLevelCreate);
  const userUpdate = useSelector((state) => state.userLevelUpdate);

  useEffect(() => {
    if (
      (userUpdate && userUpdate.redirectToNewPage) ||
      (userCreate && userCreate.redirectToNewPage)
    ) {
      navigate("/app/userlevel/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userCreate, userUpdate]);

  const backIndexPage = () => {
    navigate("/app/userlevel/list", { replace: true });
  };

  return (
    <Page className={classes.root} title="User">
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              username: "",
              name: "",
              email: "",
              mobile: "",
              password: "",
              confirm_password: "",
              role_name: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username is required"),
              name: Yup.string().required("Name is required"),
              email: Yup.string().required("Email Id is required"),
              mobile: Yup.string().required("Mobile number is required"),
              password: Yup.string(),
              confirm_password: Yup.string(),
              role_name: Yup.string().required("Role name is required"),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data["id"] = parseInt(params.id);
                dispatch(userLevelUpdateAction(data));
              } else {
                dispatch(userLevelCreateAction(data));
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
            }) {
              useEffect(() => {
                if (params.id) dispatch(userLevelListAction({ id: params.id }));
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const data = useSelector((state) => state.userLevelList.data);

              // useEffect(() => {
              //   console.log("User Data: ", data);
              // }, [data]);

              useEffect(() => {
                if (data.data && data.data.length && params.id) {
                  let d = data.data[0];
                  const fields = [
                    "username",
                    "name",
                    "email",
                    "mobile",
                    "role_name",
                  ];
                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [data]);

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardHeader
                      title={
                        params.id ? "Userlevel Update" : "Userlevel Create"
                      }
                    />
                    <Divider />
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.username && errors.username)}
                            fullWidth
                            helperText={touched.username && errors.username}
                            label="Userame"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.username}
                            variant="outlined"
                          />
                        </Grid>

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

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email Id"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.email}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.mobile && errors.mobile)}
                            fullWidth
                            helperText={touched.mobile && errors.mobile}
                            label="Mobile Number"
                            name="mobile"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.mobile}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.password && errors.password)}
                            fullWidth
                            helperText={touched.password && errors.password}
                            label="Set Password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.confirm_password &&
                                errors.confirm_password
                            )}
                            fullWidth
                            helperText={
                              touched.confirm_password &&
                              errors.confirm_password
                            }
                            label="Confirm Password"
                            name="confirm_password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirm_password}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.role_name && errors.role_name
                            )}
                            fullWidth
                            helperText={touched.role_name && errors.role_name}
                            label="Role Name"
                            name="role_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.role_name}
                            required
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box display="flex" justifyContent="flex-end" p={2}>
                      <Button
                        style={{
                          background: "#3396d3",
                          marginRight: "8px",
                          color: "white",
                        }}
                        size="medium"
                        type="submit"
                        variant="contained"
                      >
                        Submit
                      </Button>
                      <Button
                        onClick={() => backIndexPage()}
                        variant="contained"
                      >
                        Back
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
export default UserLevelForm;
