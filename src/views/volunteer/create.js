import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import * as Yup from "yup";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { fetchWrapper } from "src/services/http_requests";
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
  FormHelperText,
  ListItemText,
  CircularProgress,
} from "@material-ui/core";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import { volunteerList, create, update } from "src/Redux/Volunteer/action";
import { ngoPartnerList } from "src/Redux/NgoPartner/action";
import {
  areaOfInterestSelect,
  howYouWantToVolunteerSelect,
  languages,
  profOccupationSelect,
  selectedLableValueMultiselect,
  whyEnrollAsVolunteerSelect,
} from "src/utils/halper";
import { DistrictListAction } from "src/Redux/District/action";
import { StateList } from "src/Redux/State/action";
import { blockListAction } from "src/Redux/Block/action";
import CustomChip from "src/components/Input/CustomChip";

const VolunteerForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [age, setAge] = useState(0);

  const redirectToNewPage = useSelector(
    (state) => state.volunteer.redirectToNewPage
  );
  const states = useSelector((state) => state.State);
  const districts = useSelector((state) => state.District);
  const blocks = useSelector((state) => state.Block);
  const ngos = useSelector((state) => state.ngoPartner);

  useEffect(() => {
    dispatch(ngoPartnerList({ fetched: "All" }));
    dispatch(StateList({ fetched: "All" }));
    dispatch(ngoPartnerList({ fetched: "All" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (redirectToNewPage) {
      navigate("/app/volunteer/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToNewPage]);

  const calculateAge = (birthday) => {
    const ageDifferenceInMS = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifferenceInMS);
    const realAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    setAge(realAge);
  };

  return (
    <Page
      href="/app/volunteer/list"
      title={`Volunteer ${id ? "Update" : "Registration"}`}
    >
      <Box display="flex" flexDirection="column" justifyContent="center" m={2}>
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              mobile_number: "",
              date_of_birth: null,
              state_id: "",
              district_id: "",
              block_id: "",
              higest_education: "",
              other_higest_education: "",
              languages_instance: [],
              how_do_you_want_to_volunteer1: [],
              what_is_your_area_of_interest1: [],
              why_do_you_want_to_enroll_as_volunteer1: [],
              why_do_you_want_to_enroll_as_volunteer_other: "",
              work_experience: "",
              professional_occupation: "",
              type_of_phone: "",
              on_boarding_partner: "",
              volunteer_category: "",
              no_are_hours_commited_for_month: "",
              gender: "",
              data_display_aggrement: "",
              profile_image_volunteer: "",
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string()
                .required("First name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              last_name: Yup.string()
                .nullable()
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              email: Yup.string()
                .nullable()
                .email("Invalid email"),
              mobile_number: Yup.string()
                .required("Phone number is required")
                .matches(/^[6-9]\d{9}$/, "Phone number is not valid")
                .min(10)
                .max(10),
              date_of_birth: Yup.date().required("Date of birth is required"),
              state_id: Yup.number()
                .integer()
                .required("State name is required"),
              district_id: Yup.number()
                .integer()
                .required("District name is required"),
              block_id: Yup.number()
                .integer()
                .required("Block name is required"),
              higest_education: Yup.string().required(
                "Higest education is required"
              ),
              languages_instance: Yup.array().min(
                1,
                "Select at least one language"
              ),
              why_do_you_want_to_enroll_as_volunteer1: Yup.array().min(
                1,
                "Select at least one"
              ),
              how_do_you_want_to_volunteer1: Yup.array().min(
                1,
                "Select at least one"
              ),
              what_is_your_area_of_interest1: Yup.array().min(
                1,
                "Select at least one"
              ),
              work_experience: Yup.string().required(
                "Work Experience is required"
              ),
              professional_occupation: Yup.string().required(
                "Professional occupation is required"
              ),
              type_of_phone: Yup.string().required("Type of phone is required"),
              gender: Yup.string().required("Gender is required"),
              on_boarding_partner: Yup.string().required(
                "On boarding partner is required"
              ),
              no_are_hours_commited_for_month: Yup.number()
                .integer()
                .moreThan(0, "Enter 0 to 56")
                .lessThan(57, "Enter 0 to 56")
                .required("Number are hours commited for month is required"),
              data_display_aggrement: Yup.string()
                .required("You must agree to data display")
                .oneOf(["1"], "You have to agree to data policy"),
              profile_image_volunteer: Yup.string().nullable(),
            })}
            onSubmit={(data) => {
              if (id) {
                data["languages_known"] = data.languages_instance.join(", ");

                data[
                  "how_do_you_want_to_volunteer"
                ] = data.how_do_you_want_to_volunteer1.join(", ");

                data[
                  "what_is_your_area_of_interest"
                ] = data.what_is_your_area_of_interest1.join(", ");

                data[
                  "why_do_you_want_to_enroll_as_volunteer"
                ] = data.why_do_you_want_to_enroll_as_volunteer1.join(", ");

                data["id"] = parseInt(id);
                dispatch(update(data));
              } else {
                data["languages_known"] = data.languages_instance.join(", ");

                data[
                  "how_do_you_want_to_volunteer"
                ] = data.how_do_you_want_to_volunteer1.join(", ");

                data[
                  "what_is_your_area_of_interest"
                ] = data.what_is_your_area_of_interest1.join(", ");

                data[
                  "why_do_you_want_to_enroll_as_volunteer"
                ] = data.why_do_you_want_to_enroll_as_volunteer1.join(", ");

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
              resetForm,
              touched,
              values,
              setFieldValue,
              isValid,
            }) {
              const { id } = useParams();

              useEffect(() => {
                if (id) {
                  dispatch(volunteerList({ id }));
                  stateChange();
                  districtChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              const data = useSelector((state) => {
                return state.volunteer.data;
              });

              useEffect(() => {
                if (data.data !== undefined && data.data.length && id) {
                  let d = data.data[0];

                  const fields = [
                    "first_name",
                    "last_name",
                    "email",
                    "mobile_number",
                    "date_of_birth",
                    "state_id",
                    "district_id",
                    "block_id",
                    "higest_education",
                    "other_higest_education",
                    "why_do_you_want_to_enroll_as_volunteer_other",
                    "work_experience",
                    "professional_occupation",
                    "type_of_phone",
                    "volunteer_category",
                    "no_are_hours_commited_for_month",
                    "gender",
                    "data_display_aggrement",
                    "profile_image_volunteer",
                  ];

                  setFieldValue(
                    "on_boarding_partner",
                    d.on_boarding_partner.toString()
                  );

                  setFieldValue(
                    "languages_instance",
                    d.languages_known?.replace(/\s/g, "").split(",")
                  );

                  setFieldValue(
                    "how_do_you_want_to_volunteer1",
                    d.how_do_you_want_to_volunteer
                      ?.replace(/\s/g, "")
                      .split(",")
                  );

                  setFieldValue(
                    "what_is_your_area_of_interest1",
                    d.what_is_your_area_of_interest
                      ?.replace(/\s/g, "")
                      .split(",")
                  );

                  setFieldValue(
                    "why_do_you_want_to_enroll_as_volunteer1",
                    d.why_do_you_want_to_enroll_as_volunteer
                      ?.replace(/\s/g, "")
                      .split(",")
                  );

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
                  setFieldValue("state_id", stateId, false);
                  // setFieldValue("district_id", "", false);
                  // setFieldValue("block_id", "", false);
                } else {
                  stateId = values.state_id;
                }
                dispatch(
                  DistrictListAction({ state_id: stateId, fetched: "All" })
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

              const handleAddProfilePic = async (e) => {
                const file = e.target.files[0];
                let extention = ["png", "jpg", "JPEG", "jpeg", "svg"];
                if (file !== undefined) {
                  let ext = file.type.split("/");
                  if (ext.length && extention.includes(ext[1])) {
                    let data = await fetchWrapper.s3UploadFile(file);
                    if (data.success) {
                      setFieldValue("profile_image_volunteer", data.url, false);
                    } else {
                      toast.error(data.message);
                    }
                  } else {
                    toast.error("Please add png, jpg, JPEG, jpeg or svg only");
                  }
                }
              };

              // useEffect(() => {
              //   console.log("values: ", values);
              // }, [values]);

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.first_name && errors.first_name
                            )}
                            fullWidth
                            helperText={touched.first_name && errors.first_name}
                            label="First name"
                            name="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.first_name}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.last_name && errors.last_name
                            )}
                            fullWidth
                            helperText={touched.last_name && errors.last_name}
                            label="Last name"
                            name="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
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
                            value={values.email}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.mobile_number && errors.mobile_number
                            )}
                            fullWidth
                            helperText={
                              touched.mobile_number && errors.mobile_number
                            }
                            label="Mobile Number"
                            name="mobile_number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.mobile_number}
                            variant="outlined"
                            disabled={id}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableFuture
                              helperText={age ? `You are ${age} years old` : ""}
                              maxDate={"2006-01-01"}
                              fullWidth
                              error={Boolean(
                                touched.date_of_birth && errors.date_of_birth
                              )}
                              inputVariant="outlined"
                              animateYearScrolling
                              id="date-picker-dialog"
                              label="Date of Birth"
                              format="dd/MM/yyyy"
                              value={values.date_of_birth}
                              onChange={(value) => {
                                setFieldValue("date_of_birth", value);
                                calculateAge(value);
                              }}
                              required
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          <FormHelperText>
                            {touched.date_of_birth && errors.date_of_birth}
                          </FormHelperText>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.state_id && errors.state_id)}
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
                            required
                          >
                            <option value=""></option>
                            {states?.data?.data?.length &&
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
                            name="district_id"
                            onChange={(e) => districtChange(e)}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.district_id}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            {districts?.data?.data?.length &&
                              districts.data.data.map((el) => (
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
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.block_id}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            {blocks?.data?.data?.length &&
                              blocks.data.data.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.higest_education &&
                                errors.higest_education
                            )}
                            fullWidth
                            helperText={
                              touched.higest_education &&
                              errors.higest_education
                            }
                            label="Select highest education"
                            name="higest_education"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.higest_education}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            <option value="1">Below 10th</option>
                            <option value="2">10th Passed</option>
                            <option value="3">12th Passed</option>
                            <option value="4">Graduate</option>
                            <option value="5">Post Graduate</option>
                            <option value="6">Not Educated</option>
                            <option value="7">Others</option>
                          </TextField>
                        </Grid>
                        {values.higest_education === "7" && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Enter Highest Education"
                              variant="outlined"
                              required
                              name="other_higest_education"
                              value={values.other_higest_education}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        )}
                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.languages_instance &&
                                errors.languages_instance
                            )}
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              Languages Known
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Languages Known"
                              multiple
                              value={
                                values.languages_instance
                                  ? values.languages_instance
                                  : []
                              }
                              name="languages_instance"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  languages,
                                  "id",
                                  "name"
                                ).map((value, i) => (
                                  <CustomChip key={i} value={value} />
                                ));
                              }}
                            >
                              {languages.map((lang) => (
                                <MenuItem key={lang.id} value={lang.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.languages_instance?.indexOf(
                                        lang.id
                                      ) > -1
                                    }
                                  />
                                  <ListItemText primary={lang.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.languages_instance &&
                                errors.languages_instance}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.how_do_you_want_to_volunteer1 &&
                                errors.how_do_you_want_to_volunteer1
                            )}
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              How do you want to volunteer
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="How do you want to volunteer"
                              multiple
                              value={
                                values.how_do_you_want_to_volunteer1
                                  ? values.how_do_you_want_to_volunteer1
                                  : []
                              }
                              name="how_do_you_want_to_volunteer1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  howYouWantToVolunteerSelect,
                                  "id",
                                  "name"
                                ).map((value, i) => (
                                  <CustomChip key={i} value={value} />
                                ));
                              }}
                            >
                              {howYouWantToVolunteerSelect.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.how_do_you_want_to_volunteer1?.indexOf(
                                        obj.id
                                      ) > -1
                                    }
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.how_do_you_want_to_volunteer1 &&
                                errors.how_do_you_want_to_volunteer1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.what_is_your_area_of_interest1 &&
                                errors.what_is_your_area_of_interest1
                            )}
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              What is your area of interest
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="What is your area of interest"
                              multiple
                              value={
                                values.what_is_your_area_of_interest1
                                  ? values.what_is_your_area_of_interest1
                                  : []
                              }
                              name="what_is_your_area_of_interest1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  areaOfInterestSelect,
                                  "id",
                                  "name"
                                ).map((value, i) => (
                                  <CustomChip key={i} value={value} />
                                ));
                              }}
                            >
                              {areaOfInterestSelect.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.what_is_your_area_of_interest1?.indexOf(
                                        obj.id
                                      ) > -1
                                    }
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.what_is_your_area_of_interest1 &&
                                errors.what_is_your_area_of_interest1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.why_do_you_want_to_enroll_as_volunteer1 &&
                                errors.why_do_you_want_to_enroll_as_volunteer1
                            )}
                          >
                            <InputLabel id="demo-simple-select-outlined-label">
                              Why do you want to enroll as volunteer
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Why do you want to enroll as volunteer"
                              multiple
                              value={
                                values.why_do_you_want_to_enroll_as_volunteer1
                                  ? values.why_do_you_want_to_enroll_as_volunteer1
                                  : []
                              }
                              name="why_do_you_want_to_enroll_as_volunteer1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  whyEnrollAsVolunteerSelect,
                                  "id",
                                  "name"
                                ).map((value, i) => (
                                  <CustomChip key={i} value={value} />
                                ));
                              }}
                            >
                              {whyEnrollAsVolunteerSelect.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.why_do_you_want_to_enroll_as_volunteer1?.indexOf(
                                        obj.id
                                      ) > -1
                                    }
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.why_do_you_want_to_enroll_as_volunteer1 &&
                                errors.why_do_you_want_to_enroll_as_volunteer1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>
                        {values.why_do_you_want_to_enroll_as_volunteer1.includes(
                          "5"
                        ) && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Enter the reason of enrolling as volunteer"
                              variant="outlined"
                              required
                              name="why_do_you_want_to_enroll_as_volunteer_other"
                              value={
                                values.why_do_you_want_to_enroll_as_volunteer_other
                              }
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        )}

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.work_experience && errors.work_experience
                            )}
                            fullWidth
                            helperText={
                              touched.work_experience && errors.work_experience
                            }
                            label="Select work experience"
                            name="work_experience"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.work_experience}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </TextField>
                        </Grid>
                        {values.work_experience === "1" && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.professional_occupation &&
                                  errors.professional_occupation
                              )}
                              fullWidth
                              helperText={
                                touched.professional_occupation &&
                                errors.professional_occupation
                              }
                              label="Professional Occupation"
                              name="professional_occupation"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.professional_occupation}
                              variant="outlined"
                              required
                            >
                              <option value=""></option>
                              {profOccupationSelect.map((obj) => (
                                <option key={obj.id} value={obj.id}>
                                  {obj.name}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                        )}

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.type_of_phone && errors.type_of_phone
                            )}
                            fullWidth
                            helperText={
                              touched.type_of_phone && errors.type_of_phone
                            }
                            label="Select type of phone"
                            name="type_of_phone"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.type_of_phone}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            <option value="1">Android</option>
                            <option value="2">Feature phone</option>
                            <option value="3">IPhone</option>
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.on_boarding_partner &&
                                errors.on_boarding_partner
                            )}
                            fullWidth
                            helperText={
                              touched.on_boarding_partner &&
                              errors.on_boarding_partner
                            }
                            label="On boarding partner"
                            name="on_boarding_partner"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.on_boarding_partner}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            {ngos?.data?.data?.length &&
                              ngos.data.data.map((ng) => (
                                <option value={ng.id} key={ng.id}>
                                  {ng.ngo_name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.no_are_hours_commited_for_month &&
                                errors.no_are_hours_commited_for_month
                            )}
                            fullWidth
                            helperText={
                              touched.no_are_hours_commited_for_month &&
                              errors.no_are_hours_commited_for_month
                            }
                            label="Committment Period (in hours per week)"
                            name="no_are_hours_commited_for_month"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            type="number"
                            required
                            value={values.no_are_hours_commited_for_month}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.gender && errors.gender)}
                            fullWidth
                            helperText={touched.gender && errors.gender}
                            label="Select gender"
                            name="gender"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.gender}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                            <option value="3">Others</option>
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.data_display_aggrement &&
                                errors.data_display_aggrement
                            )}
                            fullWidth
                            helperText={
                              touched.data_display_aggrement &&
                              errors.data_display_aggrement
                            }
                            label="Select data display aggrement"
                            name="data_display_aggrement"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.data_display_aggrement}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </TextField>
                        </Grid>
                        {/* <Grid item md={6} xs={12}>
                          <FormControl
                            error={Boolean(
                              touched.data_display_aggrement &&
                                errors.data_display_aggrement
                            )}
                          >
                            <FormControlLabel
                              required
                              control={
                                <Checkbox
                                  checked={values.data_display_aggrement}
                                  onChange={handleChange}
                                  name="data_display_aggrement"
                                  color="primary"
                                />
                              }
                              label="Data display agreement"
                            />
                            <FormHelperText>
                              {touched.data_display_aggrement &&
                                errors.data_display_aggrement}
                            </FormHelperText>
                          </FormControl>
                        </Grid> */}

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
                            {values.profile_image_volunteer !== "" && (
                              <img
                                height="52"
                                src={values.profile_image_volunteer}
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
                              touched.profile_image_volunteer &&
                                errors.profile_image_volunteer
                            )}
                            fullWidth
                            helperText={
                              touched.profile_image_volunteer &&
                              errors.profile_image_volunteer
                            }
                            label="Profile picture URL"
                            name="profile_image_volunteer"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.profile_image_volunteer}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box display="flex" p={2}>
                      <Button
                        style={{ marginRight: "0.5rem" }}
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
export default VolunteerForm;
