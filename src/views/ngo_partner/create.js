import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import moment from "moment";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import { ngoPartnerList, create, update } from "src/Redux/NgoPartner/action";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { DistrictListAction } from "src/Redux/District/action";
import { blockListAction } from "src/Redux/Block/action";
import { StateList } from "src/Redux/State/action";
import {
  domainsSelect,
  ngoTypeSelect,
  selectedLableValueMultiselect,
} from "src/utils/halper";
import CustomChip from "src/components/Input/CustomChip";
import { toast } from "react-toastify";
import { fetchWrapper } from "src/services/http_requests";

const NgoPartnerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const states = useSelector((state) => state.State);
  const redirectToNewPage = useSelector((state) => {
    return state.ngoPartner.redirectToNewPage;
  });

  useEffect(() => {
    dispatch(StateList({ fetched: "All" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (redirectToNewPage) {
      navigate("/app/ngo/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToNewPage]);

  return (
    <Page href="/app/ngo/list" title={`NGO ${id ? "Update" : "Registration"}`}>
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            enableReinitialize
            initialValues={{
              ngo_name: "",
              reg_no: "",
              state_id: "",
              district_id: "",
              block_id: "",
              domain1: [],
              districts_you_work_with: [],
              contact_no: "",
              email: "",
              foundation_year: null,
              website: "",
              ceo_name: "",
              ngo_type1: [],
              other_ngo_type: "",
              password: "",
              profile_image_ngo: "",
            }}
            validationSchema={Yup.object().shape({
              ngo_name: Yup.string()
                .required("Ngo name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              reg_no: Yup.string().required("Ngo number is required"),   
              state_id: Yup.number()
                .integer()
                .required("State name is required"),
              district_id: Yup.number()
                .integer()
                .required("District name is required"),
              block_id: Yup.number()
                .integer()
                .required("Block name is required"),
              domain1: Yup.array().min(1, "Select atleast one domain1"),
              ngo_type1: Yup.array().min(1, "Select atleast one type"),
              districts_you_work_with: Yup.array().min(
                1,
                "Select atleast one district"
              ),
              contact_no: Yup.string()
                .matches(/^[6-9]\d{9}$/, "Phone number is not valid")
                .min(10)
                .max(10)
                .required("Phone number is required"),
              email: Yup.string()
                .email("Please enter correct email")
                .required("Email is required"),
              foundation_year: Yup.date()
                .nullable()
                .required("Foundation year is required"),
              website: Yup.string()
                .nullable()
                .matches(
                  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g,
                  "URL is not valid, Please enter a vlid url (http(s)?://example.com)"
                ),
              ceo_name: Yup.string()
                .nullable()
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed.")
                .max(40, "Maximux 40 characters are allowed"),
              password: Yup.string().nullable(),
              profile_image_ngo: Yup.string().nullable(),
            })}
            onSubmit={(data) => {
              if (id) {
                delete data.password;
                data["id"] = parseInt(id);
                data["domain"] = data.domain1.join(", ");
                data["foundation_year"] = moment(data.foundation_year).format(
                  "MMM-YYYY"
                );
                data["ngo_type"] = data.ngo_type1.join(", ");
                data[
                  "aspirational_district_id"
                ] = data.districts_you_work_with.join(", ");

                dispatch(update(data));
              } else {
                data["domain"] = data.domain1.join(", ");
                data["foundation_year"] = moment(data.foundation_year).format(
                  "MMM-YYYY"
                );
                data["ngo_type"] = data.ngo_type1.join(", ");
                data[
                  "aspirational_district_id"
                ] = data.districts_you_work_with.join(", ");

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
              const districtList = useSelector((state) => state.District.data);
              const blockList = useSelector((state) => state.Block.data);

              useEffect(() => {
                if (id) {
                  dispatch(ngoPartnerList({ id }));
                  stateChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              useEffect(() => {
                if (values.state_id) {
                  districtChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.state_id]);

              const ngos = useSelector((state) => {
                return state.ngoPartner.data;
              });
              useEffect(() => {
                if (ngos.data !== undefined && ngos.data.length && id) {
                  let d = ngos.data[0];
                  const fields = [
                    "ngo_name",
                    "reg_no",
                    "state_id",
                    "district_id",
                    "block_id",
                    "contact_no",
                    "other_ngo_type",
                    "email",
                    "website",
                    "ceo_name",
                    "profile_image_ngo",
                  ];

                  setFieldValue(
                    "foundation_year",
                    new Date(`1 ${d.foundation_year}`)
                  );
                  setFieldValue(
                    "domain1",
                    d.domain?.replace(/\s/g, "").split(",")
                  );
                  setFieldValue(
                    "ngo_type1",
                    d.ngo_type?.replace(/\s/g, "").split(",")
                  );

                  setFieldValue("districts_you_work_with", []);
                  setFieldValue(
                    "districts_you_work_with",
                    d.aspirational_district_id?.replace(/\s/g, "").split(",")
                  );

                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [ngos]);

              const stateChange = async (e) => {
                let stateId = "";
                if (e !== undefined && e.target.value) {
                  stateId = e.target.value;
                  setFieldValue("state_id", e.target.value, false);
                  setFieldValue("districts_you_work_with", []);
                  setFieldValue("district_id", "");
                  setFieldValue("block_id", "");
                } else {
                  stateId = values.state_id;
                }
                dispatch(
                  DistrictListAction({ fetched: "All", state_id: stateId })
                );
              };

              const districtChange = async (e) => {
                let districtId = "";
                if (e !== undefined && e.target.value) {
                  districtId = e.target.value;
                  setFieldValue("district_id", e.target.value, false);
                } else {
                  districtId = values.district_id;
                }
                dispatch(
                  blockListAction({ fetched: "All", district_id: districtId })
                );
              };

              const districtYouWorkWithChange = (e) => {
                if (e?.target?.value) {
                  setFieldValue(
                    "districts_you_work_with",
                    e.target.value.map((v) => v.toString())
                  );
                }
              };

              const handleAddProfilePic = async (e) => {
                const file = e.target.files[0];
                let extention = ["png", "jpg", "JPEG", "jpeg", "svg"];
                if (file !== undefined) {
                  let ext = file.type.split("/");
                  if (ext.length && extention.includes(ext[1])) {
                    let data = await fetchWrapper.s3UploadFile(file);
                    if (data.success) {
                      setFieldValue("profile_image_ngo", data.url, false);
                    } else {
                      toast.error(data.message);
                    }
                  } else {
                    toast.error("Please add png, jpg, JPEG, jpeg or svg only");
                  }
                }
              };

              useEffect(() => {
                if (!values.ngo_type1.includes("4")) {
                  setFieldValue("other_ngo_type", "");
                }
              }, [values, setFieldValue]);

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.ngo_name && errors.ngo_name)}
                            fullWidth
                            helperText={touched.ngo_name && errors.ngo_name}
                            label="NGO Name"
                            name="ngo_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.ngo_name}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.reg_no && errors.reg_no)}
                            fullWidth
                            helperText={touched.reg_no && errors.reg_no}
                            label="Registeration number"
                            name="reg_no"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.reg_no}
                            variant="outlined"
                            required
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(touched.domain1 && errors.domain1)}
                          >
                            <InputLabel id="select-outlined-label">
                              Domain
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Select State"
                              multiple
                              value={values.domain1 || []}
                              name="domain1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  domainsSelect,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {domainsSelect.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.domain1?.indexOf(obj.id) > -1
                                        ? true
                                        : false
                                    }
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.domain1 && errors.domain1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.state_id && errors.state_id)}
                            fullWidth
                            helperText={touched.state_id && errors.state_id}
                            label="Select state"
                            name="state_id"
                            InputLabelProps={{ shrink: values.state_id }}
                            id="state_id"
                            onChange={(e) => stateChange(e)}
                            onBlur={handleBlur}
                            select
                            required
                            SelectProps={{ native: true }}
                            value={values.state_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {states?.data?.data?.length > 0 &&
                              states.data.data.map((el) => (
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
                            InputLabelProps={{ shrink: values.district_id }}
                            name="district_id"
                            onChange={(e) => districtChange(e)}
                            onBlur={handleBlur}
                            select
                            required
                            SelectProps={{ native: true }}
                            value={values.district_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {districtList.data?.length &&
                              districtList.data?.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.block_id && errors.block_id)}
                            fullWidth
                            helperText={touched.block_id && errors.block_id}
                            label="Select block"
                            name="block_id"
                            InputLabelProps={{ shrink: values.block_id }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            required
                            SelectProps={{ native: true }}
                            value={values.block_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {blockList.data?.length &&
                              blockList.data?.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.contact_no && errors.contact_no
                            )}
                            fullWidth
                            helperText={touched.contact_no && errors.contact_no}
                            label="Contact Number"
                            name="contact_no"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.contact_no}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.email && errors.email)}
                            fullWidth
                            helperText={touched.email && errors.email}
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            disabled={id}
                            value={values.email}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                              fullWidth
                              disableFuture
                              error={Boolean(
                                touched.foundation_year &&
                                  errors.foundation_year
                              )}
                              variant="inline"
                              inputVariant="outlined"
                              openTo="year"
                              views={["year", "month"]}
                              label="Foundation year"
                              required
                              helperText={
                                touched.foundation_year &&
                                errors.foundation_year
                              }
                              value={values.foundation_year}
                              onChange={(value) =>
                                setFieldValue("foundation_year", value)
                              }
                              onBlur={handleBlur}
                            />
                          </MuiPickersUtilsProvider>
                          <FormHelperText>
                            {touched.foundation_year && errors.foundation_year}
                          </FormHelperText>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.website && errors.website)}
                            fullWidth
                            helperText={touched.website && errors.website}
                            label="Website"
                            name="website"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.website}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.ceo_name && errors.ceo_name)}
                            fullWidth
                            helperText={touched.ceo_name && errors.ceo_name}
                            label="CEO Name"
                            name="ceo_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.ceo_name}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.districts_you_work_with &&
                                errors.districts_you_work_with
                            )}
                          >
                            <InputLabel id="select-outlined-label">
                              Which districts you are working with
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Which districts you are working with"
                              multiple
                              value={values.districts_you_work_with || []}
                              name="districts_you_work_with"
                              onChange={districtYouWorkWithChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  districtList?.data,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {districtList?.data?.length &&
                                districtList.data.map((dist) => (
                                  <MenuItem
                                    key={dist.id}
                                    value={dist.id.toString()}
                                  >
                                    <Checkbox
                                      color="primary"
                                      checked={
                                        values.districts_you_work_with?.indexOf(
                                          dist.id.toString()
                                        ) > -1
                                          ? true
                                          : false
                                      }
                                    />
                                    <ListItemText primary={dist.name} />
                                  </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                              {touched.districts_you_work_with &&
                                errors.districts_you_work_with}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.ngo_type1 && errors.ngo_type1
                            )}
                          >
                            <InputLabel id="select-outlined-label">
                              NGO Type
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Select State"
                              multiple
                              value={values.ngo_type1 || []}
                              name="ngo_type1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  ngoTypeSelect,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {ngoTypeSelect.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.ngo_type1?.indexOf(obj.id) > -1
                                        ? true
                                        : false
                                    }
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.ngo_type1 && errors.ngo_type1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        {values.ngo_type1?.includes("4") && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Specified other"
                              variant="outlined"
                              required
                              name="other_ngo_type"
                              value={values.other_ngo_type}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        )}
                        {!id && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.password && errors.password
                              )}
                              fullWidth
                              helperText={touched.password && errors.password}
                              label="Password"
                              name="password"
                              required
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              variant="outlined"
                            />
                          </Grid>
                        )}

                        <Grid item md={6} xs={12}>
                          <Box display="flex" alignItems="center">
                            <Button
                              variant="contained"
                              fullWidth
                              style={{
                                padding: "0.9rem 0",
                                position: "relative",
                              }}
                            >
                              <input
                                type="file"
                                className="hiddenFileInput"
                                onChange={handleAddProfilePic}
                              />
                              Select profile picture
                            </Button>
                            {values.profile_image_ngo !== "" && (
                              <img
                                height="52"
                                src={values.profile_image_ngo}
                                alt="selected logo"
                                style={{
                                  marginLeft: "5px",
                                  borderRadius: "2px",
                                }}
                              />
                            )}
                          </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.profile_image_ngo &&
                                errors.profile_image_ngo
                            )}
                            fullWidth
                            helperText={
                              touched.profile_image_ngo &&
                              errors.profile_image_ngo
                            }
                            label="Profile picture URL"
                            name="profile_image_ngo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.profile_image_ngo}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box display="flex" p={2}>
                      <Button
                        style={{
                          marginRight: "0.5rem",
                        }}
                        // disabled={isLoading ? true : false}
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
export default NgoPartnerForm;
