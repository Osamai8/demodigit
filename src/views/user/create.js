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
  CardContent,
  Card,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import {
  userCreateAction,
  userListAction,
  userUpdateAction,
} from "src/Redux/Users/action";
import { userLevelListAction } from "src/Redux/UserLevel/action";

const UserForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const user = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user?.redirectToNewPage) {
      navigate("/app/user_management/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Page
      href="/app/user_management/list"
      title={`User ${params.id ? "Update" : "Registration"}`}
    >
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
              level_id: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required("Username is required")
                .matches(/^[\w\-\s]+$/, "Only alphanumerics are allowed."),
              name: Yup.string()
                .required("Name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              email: Yup.string()
                .email("Invalid Email")
                .when("level_id", {
                  is: (val) => val !== "2",
                  then: Yup.string().required("Email is required"),
                }),
              mobile: Yup.string()
                .matches(/^[6-9]\d{9}$/, "Phone number is not valid")
                .min(10)
                .max(10)
                .required("Mobile number is required"),
              password: Yup.string()
                .min(5, "Passwod should be at least 5 characters")
                .when("level_id", {
                  is: (val) => val !== "2",
                  then: Yup.string().required("Password is required"),
                }),
              confirm_password: Yup.string()
                .when("level_id", {
                  is: (val) => val !== "2",
                  then: Yup.string().required("You must confirm your password"),
                })
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
              level_id: Yup.string().required("Role name is required"),
            })}
            onSubmit={(data) => {
              if (params.id) {
                delete data.password;
                delete data.confirm_password;
                data["id"] = parseInt(params.id);
                // console.log("data: ", data);
                dispatch(userUpdateAction(data));
              } else {
                // console.log("data: ", data);
                dispatch(userCreateAction(data));
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
                dispatch(userLevelListAction());
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              useEffect(() => {
                if (params.id) {
                  setFieldValue("password", "password");
                  setFieldValue("confirm_password", "password");
                  dispatch(userListAction({ id: params.id, fetched: "All" }));
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const data = useSelector((state) => state.user.data);
              const userLevelList = useSelector(
                (state) => state.userLevelList.data
              );

              // useEffect(() => {
              //   console.log("User Data: ", userLevelList);
              // }, [userLevelList]);

              useEffect(() => {
                if (data.data && data.data.length && params.id) {
                  let d = data.data[0];
                  const fields = [
                    "username",
                    "name",
                    "email",
                    "mobile",
                    "level_id",
                  ];
                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [data]);

              return (
                <form onSubmit={handleSubmit} autoComplete="off">
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.username && errors.username)}
                            fullWidth
                            helperText={touched.username && errors.username}
                            label="Username"
                            name="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.username}
                            disabled={params.id}
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
                            // required={values.level_id !== "2"}
                            disabled={params.id}
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
                            InputLabelProps={{ shrink: Boolean(values.mobile) }}
                            label="Mobile Number"
                            name="mobile"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.mobile}
                            variant="outlined"
                          />
                        </Grid>

                        {!params.id && (
                          <>
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.password && errors.password
                                )}
                                fullWidth
                                helperText={touched.password && errors.password}
                                label="Set Password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                disabled={params.id}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                variant="outlined"
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment>
                                      <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                          setShowPassword(!showPassword)
                                        }
                                      >
                                        {showPassword ? (
                                          <VisibilityIcon />
                                        ) : (
                                          <VisibilityOffIcon />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>

                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.confirm_password &&
                                    errors.confirm_password
                                )}
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                helperText={
                                  touched.confirm_password &&
                                  errors.confirm_password
                                }
                                // required={values.level_id !== "2"}
                                required
                                disabled={params.id}
                                label="Confirm Password"
                                name="confirm_password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirm_password}
                                variant="outlined"
                              />
                            </Grid>
                          </>
                        )}

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.level_id && errors.level_id)}
                            fullWidth
                            helperText={touched.level_id && errors.level_id}
                            label="Select Role Name"
                            name="level_id"
                            InputLabelProps={{ shrink: values.level_id }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.level_id}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            {userLevelList?.data?.length ? (
                              <option
                                value={
                                  userLevelList.data.find((obj) => obj.id === 1)
                                    .id
                                }
                              >
                                {
                                  userLevelList?.data?.find(
                                    (obj) => obj.id === 1
                                  ).name
                                }
                              </option>
                            ) : (
                              <option disabled>No role</option>
                            )}
                          </TextField>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Box display="flex" p={2}>
                      <Button
                        style={{
                          marginRight: "0.5rem",
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
