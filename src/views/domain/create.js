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
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import {
  domainCreateAction,
  domainListAction,
  domainUpdateAction,
} from "src/Redux/Domain/action";

const DomainForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const domain = useSelector((state) => state.Domain);

  useEffect(() => {
    if (domain.redirectToNewPage) {
      navigate("/app/domain/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const backIndexPage = () => {
    navigate("/app/domain/list", { replace: true });
  };

  return (
    <Page
      href="/app/domain/list"
      title={`Domain ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Domain name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data["id"] = parseInt(params.id);
                dispatch(domainUpdateAction(data));
              } else {
                dispatch(domainCreateAction(data));
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
                if (params.id) dispatch(domainListAction({ id: params.id }));
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const { data } = useSelector((state) => state.Domain);

              useEffect(() => {
                if (data.data?.length && params.id) {
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
                            label="Domain Name"
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
                      <Button onClick={backIndexPage} variant="contained">
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
export default DomainForm;
