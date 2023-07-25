import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import DateFnsUtils from "@date-io/date-fns";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Divider,
  CardContent,
  Card,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import Page from "src/components/Page";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import { StateList } from "src/Redux/State/action";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { DistrictListAction } from "src/Redux/District/action";
import { blockListAction } from "src/Redux/Block/action";
import {
  beneficiaryListAction,
  createAction,
  updateAction,
} from "src/Redux/Beneficiary/action";
import { fetchWrapper } from "../../services/http_requests";
import { toast } from "react-toastify";
import {
  beneficiaryCategories,
  beneficiaryClass,
  beneficiaryDisabilities,
  beneficiaryDropoutReason,
  beneficiaryEngagement,
  beneficiaryGender,
  beneficiaryOccupation,
  beneficiaryStatus,
} from "src/utils/halper";
const baseUrl = process.env.REACT_APP_API_URL;


const BeneficiaryForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [ben, setBen] = useState([]);

  const beneficiaries = useSelector((state) => state.beneficiary.data);
  const redirectToNewPage = useSelector(
    (state) => state.beneficiary.redirectToNewPage
  );
  const createError = useSelector((state) => state.beneficiary.isError);
  const statesData = useSelector((state) => state.State.data);
  const districtData = useSelector((state) => state.District.data);
  const blockData = useSelector((state) => state.Block.data);

  useEffect(() => {
    setBen(beneficiaries?.data);
  }, [beneficiaries]);

  useEffect(() => {
    if (redirectToNewPage) {
      navigate("/app/beneficiary/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToNewPage]);

  useEffect(() => {
    dispatch(StateList({ fetched: "All" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page
      href="/app/beneficiary/list"
      title={`Beneficiary ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              state_id: "",
              district_id: "",
              block_id: "",
              village_name: "",
              first_name: "",
              last_name: "",
              father_name: "",
              mother_name: "",
              date_of_birth: null,
              age: "",
              mobile_number: "",
              gender: "",
              cetegory: "",
              bpl_status: "",
              disability_type: "",
              student_status: "",
              school_name: "",
              last_class_attended: "",
              dropout_year: null,
              dropout_reason: "",
              dropout_other_reason: "",
              present_eng_of_std: "",
              other_present_eng_of_std: "",
              family_occupation: "",
              other_family_occupation: "",
              how_many_members_are_there_in_family: "",
              // how_many_girls_child_between_age_group: "",
              data_policy_agreement: "",
            }}
            validationSchema={Yup.object().shape({
              state_id: Yup.string().required("State is required"),
              district_id: Yup.string().required("District is required"),
              block_id: Yup.string().required("Block is required"),
              cluster_id: Yup.string().nullable(),
              village_name: Yup.string().nullable(),
              class: Yup.string().nullable(),
              father_name: Yup.string()
                .required("Student Father Name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              mother_name: Yup.string()
                .required("Student Mother Name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              mobile_number: Yup.string()
                .required("Contact number is required")
                .matches(/^[5-9]\d{9}$/, "Contact number is not valid")
                .min(10)
                .max(10),
              cetegory: Yup.string().nullable(),
              bpl_status: Yup.string().nullable(),
              family_occupation: Yup.string().nullable(),
              how_many_members_are_there_in_family: Yup.string().nullable(),

              first_name: Yup.string()
                .required("Student First Name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              last_name: Yup.string().nullable(),
              date_of_birth: Yup.date().required(
                "Student Date of birth is required"
              ),
              age: Yup.number()
                .nullable()
                .integer(),

              gender: Yup.string().required("Gender is required"),
              disability_type: Yup.string().nullable(),
              student_status: Yup.string().nullable(),
              school_name: Yup.string().nullable(),
              last_class_attended: Yup.string(),
              dropout_year: Yup.string().nullable(),
              dropout_reason: Yup.string(),
              dropout_other_reason: Yup.string()
                .nullable()
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed.")
                .max(160, "Maximum 160 characters are allowed"),
              present_eng_of_std: Yup.string(),
              other_present_eng_of_std: Yup.string()
                .nullable()
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed.")
                .max(160, "Maximum 160 characters are allowed"),

              other_family_occupation: Yup.string()
                .nullable()
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              data_policy_agreement: Yup.string()
                .oneOf(["1"], "You have to agree to data policy"),
            })}
            onSubmit={(data) => {
              if (params.id) {
                data.dropout_year = data.dropout_year ? new Date(
                  data.dropout_year
                )?.getUTCFullYear() : null;
                data["id"] = params.id;
                dispatch(updateAction(data));
              } else {
                data.dropout_year = data.dropout_year ? new Date(
                  data.dropout_year
                )?.getUTCFullYear() : null;
                dispatch(createAction(data));
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
              setSubmitting,
              resetForm,
              isValid,
              isInitialValid,
            }) {
              const [clusterData, setClusterData] = useState([]);
              const [villageData, setVillageData] = useState([]);
              const [schoolData, setSchoolData] = useState([]);
              const [campaignName, setCampaingName] = useState(null);

              useEffect(() => {
                if (params.id)
                  dispatch(beneficiaryListAction({ id: params.id }));
              }, []);

              useEffect(() => {
                if (params.id && ben?.length > 0) {
                  const d = ben[0];
                  const fields = [
                    "state_id",
                    "district_id",
                    "block_id",
                    "cluster_id",
                    "village_name",
                    "first_name",
                    "last_name",
                    "father_name",
                    "mother_name",
                    "date_of_birth",
                    "mobile_number",
                    "gender",
                    "cetegory",
                    "bpl_status",
                    "disability_type",
                    "student_status",
                    "school_name",
                    "last_class_attended",
                    "dropout_reason",
                    "dropout_other_reason",
                    "present_eng_of_std",
                    "other_present_eng_of_std",
                    "family_occupation",
                    "other_family_occupation",
                    "how_many_members_are_there_in_family",
                    "class",
                    // "how_many_girls_child_between_age_group",
                    "data_policy_agreement",
                  ];

                  calculateAge(new Date(d.date_of_birth));

                  setFieldValue("dropout_year", d.dropout_year);
                  setCampaingName(d['campaign_name']);
                  fields.forEach((field) => {
                    setFieldValue(field, d[field] || "", false);
                  });
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [ben]);

              useEffect(() => {
                if (createError) {
                  setSubmitting(false);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [setSubmitting, createError]);

              useEffect(() => {
                if (values.state_id) {
                  stateChange(values.state_id);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.state_id]);

              const stateChange = async (state_id) => {
                dispatch(DistrictListAction({ state_id, fetched: "All" }));
              };
              useEffect(() => {
                if (values.district_id) {
                  districtChange(values.district_id);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.district_id]);

              const districtChange = async (district_id) => {
                dispatch(blockListAction({ fetched: "All", district_id }));
              };


              const calculateAge = (birthday) => {
                const ageDifferenceInMS = Date.now() - birthday.getTime();
                const ageDate = new Date(ageDifferenceInMS);
                const realAge = Math.abs(ageDate.getUTCFullYear() - 1970);
                setFieldValue("age", realAge);
              };

              useEffect(() => {
                if (values.block_id) {
                  clusterList(values.block_id)
                }
              }, [values.block_id])

              const clusterList = async (id) => {
                let url = `${baseUrl}cluster/list?block_id=${id}&fetched=All`;
                try {
                  let data = await fetchWrapper.get(url);
                  setClusterData(data?.data);
                } catch (error) {
                  toast.error(error);
                }
              };
              console.log("cluster", clusterData)

              useEffect(() => {
                if (values.cluster_id) {
                  villageList(values.cluster_id)
                }
              }, [values.cluster_id])

              const villageList = async (id) => {
                let url = `${baseUrl}village/list?cluster_id=${id}&fetched=All`;
                try {
                  let data = await fetchWrapper.get(url);
                  setVillageData(data?.data);
                } catch (error) {
                  toast.error(error);
                }
              }
              useEffect(() => {
                if (values.village_name && campaignName === "Buniyaadi Shiksha Abiyaan") {
                  schoolList(values.village_name)
                }
              }, [values.village_name])

              const schoolList = async (id) => {
                let url = `${baseUrl}school/list?village_id=${id}&fetched=All`;
                try {
                  let data = await fetchWrapper.get(url);
                  setSchoolData(data?.data);
                } catch (error) {
                  toast.error(error);
                }
              }
              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                          <h2>Familly Details</h2>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.state_id && errors.state_id)}
                            fullWidth
                            helperText={touched.state_id && errors.state_id}
                            label="Select State/ Union Territory"
                            name="state_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.state_id}
                            variant="outlined"
                            required
                            InputLabelProps={{
                              shrink: Boolean(values.state_id),
                            }}
                          >
                            <option value=""></option>
                            {statesData?.data?.map((state) => (
                              <option key={state.id} value={state.id}>
                                {state.name}
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
                            label="Select District"
                            name="district_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.district_id}
                            variant="outlined"
                            required
                            InputLabelProps={{
                              shrink: Boolean(values.district_id),
                            }}
                          >
                            <option value=""></option>
                            {districtData?.data?.map((dist) => (
                              <option key={dist.id} value={dist.id}>
                                {dist.name}{" "}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.block_id && errors.block_id)}
                            fullWidth
                            helperText={touched.block_id && errors.block_id}
                            label="Select Block"
                            name="block_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.block_id}
                            variant="outlined"
                            required
                            InputLabelProps={{
                              shrink: Boolean(values.block_id),
                            }}
                          >
                            <option value=""></option>
                            {blockData?.data?.map((block) => (
                              <option key={block.id} value={block.id}>
                                {block.name}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) &&
                          (<Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.village_name && errors.village_name
                              )}
                              fullWidth
                              helperText={
                                touched.village_name && errors.village_name
                              }
                              label="Enter Village Name"
                              name="village_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.village_name}
                              variant="outlined"
                            />
                          </Grid>)
                        }

                        {
                          ['Buniyaadi Shiksha Abiyaan'].includes(campaignName) &&
                          (<Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(touched.cluster_id && errors.cluster_id)}
                              fullWidth
                              helperText={touched.cluster_id && errors.cluster_id}
                              label="Select cluster"
                              name="cluster_id"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.cluster_id}
                              variant="outlined"
                              InputLabelProps={{
                                shrink: Boolean(values.cluster_id),
                              }}
                            >
                              <option value=""></option>
                              {clusterData?.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                          )}

                        {/* Buniyaadi Shiksha Abiyaan */}

                        {['Buniyaadi Shiksha Abiyaan'].includes(campaignName) &&
                          (<Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(touched.village_name && errors.village_name)}
                              fullWidth
                              helperText={touched.village_name && errors.village_name}
                              label="Select village"
                              name="village_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.village_name}
                              variant="outlined"
                              InputLabelProps={{
                                shrink: Boolean(values.village_name),
                              }}
                            >
                              <option value=""></option>
                              {villageData?.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                          )}

                        {['Buniyaadi Shiksha Abiyaan'].includes(campaignName) &&
                          (<Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(touched.school_name && errors.school_name)}
                              fullWidth
                              helperText={touched.school_name && errors.school_name}
                              label="Select school"
                              name="school_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.school_name}
                              variant="outlined"
                              InputLabelProps={{
                                shrink: Boolean(values.school_name),
                              }}
                            >
                              <option value=""></option>
                              {schoolData?.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                          )}

                        {
                          ['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (<Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.class && errors.class)}
                                fullWidth
                                helperText={touched.class && errors.class}
                                label="Select class"
                                name="class"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.class}
                                variant="outlined"
                                required
                              >
                                <option value=""></option>
                                {beneficiaryClass.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>) : ""
                        }


                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.father_name && errors.father_name
                            )}
                            fullWidth
                            helperText={
                              touched.father_name && errors.father_name
                            }
                            label="Enter Father's Name"
                            name="father_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.father_name}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.mother_name && errors.mother_name
                            )}
                            fullWidth
                            helperText={
                              touched.mother_name && errors.mother_name
                            }
                            label="Enter Mother's Name"
                            name="mother_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.mother_name}
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
                            label="Enter Contact Number"
                            name="mobile_number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.mobile_number}
                            variant="outlined"
                          />
                        </Grid>
                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (<Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(touched.cetegory && errors.cetegory)}
                                fullWidth
                                helperText={touched.cetegory && errors.cetegory}
                                label="Select Category"
                                name="cetegory"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.cetegory}
                                variant="outlined"
                                required
                              >
                                <option value=""></option>
                                {beneficiaryCategories.map((cat) => (
                                  <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>) : ""
                        }

                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (<Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.bpl_status && errors.bpl_status
                                )}
                                fullWidth
                                helperText={touched.bpl_status && errors.bpl_status}
                                label="Select Below Poverty Line (BPL) Status"
                                name="bpl_status"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.bpl_status}
                                variant="outlined"
                                required
                              >
                                <option value=""></option>
                                <option value="2">No</option>
                                <option value="1">Yes</option>
                              </TextField>
                            </Grid>
                            ) : ""
                        }

                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (<Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.family_occupation &&
                                  errors.family_occupation
                                )}
                                fullWidth
                                helperText={
                                  touched.family_occupation &&
                                  errors.family_occupation
                                }
                                label="What is your Family Occupation"
                                name="family_occupation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.family_occupation}
                                variant="outlined"
                                required
                              >
                                <option value=""></option>
                                {beneficiaryOccupation.map((occ) => (
                                  <option key={occ.id} value={occ.id}>
                                    {occ.name}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>
                            ) : ""
                        }

                        {!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) && values.family_occupation === "6" && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.other_family_occupation &&
                                errors.other_family_occupation
                              )}
                              fullWidth
                              helperText={
                                touched.other_family_occupation &&
                                errors.other_family_occupation
                              }
                              label="Please Specify other Family Occupation"
                              name="other_family_occupation"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              value={values.other_family_occupation}
                              variant="outlined"
                            />
                          </Grid>
                        )}

                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (
                              <Grid item md={6} xs={12}>
                                <TextField
                                  error={Boolean(
                                    touched.how_many_members_are_there_in_family &&
                                    errors.how_many_members_are_there_in_family
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.how_many_members_are_there_in_family &&
                                    errors.how_many_members_are_there_in_family
                                  }
                                  label="How many members are there in family?"
                                  name="how_many_members_are_there_in_family"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  select
                                  SelectProps={{ native: true }}
                                  value={values.how_many_members_are_there_in_family}
                                  variant="outlined"
                                >
                                  <option value=""></option>
                                  {Array.from({ length: 20 }, (_, i) => i + 1).map(
                                    (num, i) => (
                                      <option value={num} key={i}>
                                        {num}
                                      </option>
                                    )
                                  )}
                                </TextField>
                              </Grid>
                            ) : ""
                        }
                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (
                              <Grid item md={12} xs={12}>
                                <h2>
                                  Adolescent girl child details(Age 10 to 19 years)
                                </h2>
                              </Grid>
                            ) : ""
                        }

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.first_name && errors.first_name
                            )}
                            fullWidth
                            helperText={touched.first_name && errors.first_name}
                            label="Enter Child First Name"
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
                            label="Enter Child Last Name"
                            name="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              disableFuture
                              minDate={"2002-01-01"}
                              maxDate={"2011-01-01"}
                              fullWidth
                              error={Boolean(
                                touched.date_of_birth && errors.date_of_birth
                              )}
                              inputVariant="outlined"
                              animateYearScrolling
                              id="date-picker-dialog"
                              label="Enter DOB of Child"
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
                            error={Boolean(touched.age && errors.age)}
                            fullWidth
                            helperText={touched.age && errors.age}
                            label="Age"
                            disabled
                            name="age"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.age}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.gender && errors.gender)}
                            fullWidth
                            helperText={touched.gender && errors.gender}
                            label="Gender"
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
                            {beneficiaryGender.map((gender) => (
                              <option key={gender.id} value={gender.id}>
                                {gender.name}
                              </option>
                            ))}
                          </TextField>
                        </Grid>


                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (
                              <Grid item md={6} xs={12}>
                                <TextField
                                  error={Boolean(
                                    touched.disability_type && errors.disability_type
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.disability_type && errors.disability_type
                                  }
                                  label="Select Disability Type"
                                  name="disability_type"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  select
                                  SelectProps={{ native: true }}
                                  value={values.disability_type}
                                  variant="outlined"
                                  required
                                >
                                  <option value=""></option>
                                  {beneficiaryDisabilities.map((dis) => (
                                    <option key={dis.id} value={dis.id}>
                                      {dis.name}
                                    </option>
                                  ))}
                                </TextField>
                              </Grid>) : ""
                        }

                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (
                              <Grid item md={6} xs={12}>
                                <TextField
                                  error={Boolean(
                                    touched.student_status && errors.student_status
                                  )}
                                  fullWidth
                                  helperText={
                                    touched.student_status && errors.student_status
                                  }
                                  label="Select school enrollment status of Child"
                                  name="student_status"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  select
                                  SelectProps={{ native: true }}
                                  value={values.student_status}
                                  variant="outlined"
                                  required
                                >
                                  <option value=""></option>
                                  {beneficiaryStatus.map((status) => (
                                    <option key={status.id} value={status.id}>
                                      {status.name}
                                    </option>
                                  ))}
                                </TextField>
                              </Grid>
                            ) : ""
                        }

                        {!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) && (values.student_status === "3" ||
                          values.student_status === "4") && (
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.school_name && errors.school_name
                                )}
                                fullWidth
                                helperText={
                                  touched.school_name && errors.school_name
                                }
                                label="Enter School Name"
                                name="school_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.school_name}
                                variant="outlined"
                              />
                            </Grid>)
                        }

                        {!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                          (
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.last_class_attended &&
                                  errors.last_class_attended
                                )}
                                fullWidth
                                helperText={
                                  touched.last_class_attended &&
                                  errors.last_class_attended
                                }
                                label="Select Last Class Attended"
                                name="last_class_attended"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.last_class_attended}
                                variant="outlined"
                                required
                              >
                                <option value=""></option>
                                {Array.from(
                                  { length: 12 },
                                  (_, i) => i + 1
                                ).map((num, i) => (
                                  <option value={num} key={i}>
                                    {num}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>) : ""
                        }

                        {!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                          (
                            <Grid item md={6} xs={12}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  disableFuture
                                  minDate="01/01/2016"
                                  fullWidth
                                  views={["year"]}
                                  error={Boolean(
                                    touched.dropout_year && errors.dropout_year
                                  )}
                                  inputVariant="outlined"
                                  animateYearScrolling
                                  id="date-picker-dialog"
                                  label="Select Year of Dropout"
                                  format="yyyy"
                                  value={values.dropout_year}
                                  onChange={(value) => {
                                    setFieldValue("dropout_year", value);
                                  }}
                                  required
                                  KeyboardButtonProps={{
                                    "aria-label": "change date",
                                  }}
                                />
                              </MuiPickersUtilsProvider>
                              <FormHelperText>
                                {touched.dropout_year && errors.dropout_year}
                              </FormHelperText>
                            </Grid>) : ""
                        }

                        {!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                          (<Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.dropout_reason &&
                                errors.dropout_reason
                              )}
                              fullWidth
                              helperText={
                                touched.dropout_reason &&
                                errors.dropout_reason
                              }
                              label="Select Reason for Dropout"
                              name="dropout_reason"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.dropout_reason}
                              variant="outlined"
                              required
                            >
                              <option value=""></option>
                              {beneficiaryDropoutReason.map((drop) => (
                                <option key={drop.id} value={drop.id}>
                                  {drop.name}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                          ) : ""}

                        {(!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) && values.dropout_reason === "13")
                          &&
                          (
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.dropout_other_reason &&
                                  errors.dropout_other_reason
                                )}
                                fullWidth
                                helperText={
                                  touched.dropout_other_reason &&
                                  errors.dropout_other_reason
                                }
                                label="Please specify other reason of Dropout"
                                name="dropout_other_reason"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.dropout_other_reason}
                                variant="outlined"
                              />
                            </Grid>
                          )}

                        {(!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) && values.student_status === "1") &&
                          (
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.school_name && errors.school_name
                                )}
                                fullWidth
                                helperText={
                                  touched.school_name && errors.school_name
                                }
                                label="Enter School Name"
                                name="school_name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                value={values.school_name}
                                variant="outlined"
                              />
                            </Grid>)
                        }

                        {!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                          (
                            <Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.present_eng_of_std &&
                                  errors.present_eng_of_std
                                )}
                                fullWidth
                                helperText={
                                  touched.present_eng_of_std &&
                                  errors.present_eng_of_std
                                }
                                label="Select Present Engagement of Child"
                                name="present_eng_of_std"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.present_eng_of_std}
                                variant="outlined"
                                required
                              >
                                <option value=""></option>
                                {beneficiaryEngagement.map((eng) => (
                                  <option key={eng.id} value={eng.id}>
                                    {eng.name}
                                  </option>
                                ))}
                              </TextField>
                            </Grid>) : ""
                        }

                        {(!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) && values.present_eng_of_std === "6") && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.other_present_eng_of_std &&
                                errors.other_present_eng_of_std
                              )}
                              fullWidth
                              helperText={
                                touched.other_present_eng_of_std &&
                                errors.other_present_eng_of_std
                              }
                              label="Please specify Present Engagement of Child"
                              name="other_present_eng_of_std"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.other_present_eng_of_std}
                              variant="outlined"
                              required
                            />
                          </Grid>
                        )}

                        {(!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) && values.student_status === "2") && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.present_eng_of_std &&
                                errors.present_eng_of_std
                              )}
                              fullWidth
                              helperText={
                                touched.present_eng_of_std &&
                                errors.present_eng_of_std
                              }
                              label="Select Present Engagement of Child"
                              name="present_eng_of_std"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              select
                              SelectProps={{ native: true }}
                              value={values.present_eng_of_std}
                              variant="outlined"
                              required
                            >
                              <option value=""></option>
                              {beneficiaryEngagement.map((eng) => (
                                <option key={eng.id} value={eng.id}>
                                  {eng.name}
                                </option>
                              ))}
                            </TextField>
                          </Grid>
                        )}

                        {(!['Buniyaadi Shiksha Abiyaan'].includes(campaignName) && values.present_eng_of_std === "6") && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              error={Boolean(
                                touched.other_present_eng_of_std &&
                                errors.other_present_eng_of_std
                              )}
                              fullWidth
                              helperText={
                                touched.other_present_eng_of_std &&
                                errors.other_present_eng_of_std
                              }
                              label="Please specify Present Engagement of Child"
                              name="other_present_eng_of_std"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.other_present_eng_of_std}
                              variant="outlined"
                              required
                            />
                          </Grid>
                        )}

                        {
                          !['Buniyaadi Shiksha Abiyaan'].includes(campaignName) ?
                            (<Grid item md={6} xs={12}>
                              <TextField
                                error={Boolean(
                                  touched.data_policy_agreement &&
                                  errors.data_policy_agreement
                                )}
                                fullWidth
                                helperText={
                                  touched.data_policy_agreement &&
                                  errors.data_policy_agreement
                                }
                                label="Agree to Data Policy?"
                                name="data_policy_agreement"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                select
                                SelectProps={{ native: true }}
                                value={values.data_policy_agreement}
                                variant="outlined"
                                required
                              >
                                <option value=""></option>
                                <option value="1">Yes</option>
                                <option value="2">No</option>
                              </TextField>
                            </Grid>
                            ) : ""
                        }
                      </Grid>
                    </CardContent>
                    <Divider />
                    <Box display="flex" p={2}>
                      <Button
                        style={{
                          marginRight: "8px",
                        }}
                        disabled={isSubmitting ? true : false}
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
    </Page >
  );
};
export default BeneficiaryForm;
