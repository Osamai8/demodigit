import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isDate, parse } from "date-fns";
import * as Yup from "yup";
import { Formik } from "formik";
import moment from "moment";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  CardContent,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  FormHelperText,
  CircularProgress,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { useDispatch, useSelector } from "react-redux";
import Page from "src/components/Page";
import {
  createAction,
  updateAction,
  getCampaignByIdAction,
} from "src/Redux/Campaign/action";
import { StateList } from "src/Redux/State/action";
import { DistrictListAction } from "src/Redux/District/action";
import { blockListAction } from "src/Redux/Block/action";
import { domainListAction } from "src/Redux/Domain/action";
import { subDomainListAction } from "src/Redux/SubDomain/action";
import { streamListAction } from "src/Redux/Stream/action";
import { fetchWrapper } from "src/services/http_requests";
import { toast } from "react-toastify";
import {
  campaignMode,
  learningOpportunities,
  selectedLableValueMultiselect,
  stakeHolders,
} from "src/utils/halper";
import CustomChip from "src/components/Input/CustomChip";
import CustomInput from "../../components/CustomInput";
import EditorTextArea from "src/components/EditorTextArea";

const CampaignForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const campaigns = useSelector((state) => state.campaign);
  const statesData = useSelector((state) => state.State.data);
  const districts = useSelector((state) => state.District);
  const blocks = useSelector((state) => state.Block);
  const domainData = useSelector((state) => state.Domain.data);

  useEffect(() => {
    if (campaigns.redirectToNewPage) {
      navigate("/app/campaign/list", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaigns]);

  useEffect(() => {
    dispatch(StateList({ fetched: "All" }));
    dispatch(domainListAction({ fetched: "All" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const parseDateString = (value, originalValue) => {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());
    return parsedDate;
  };

  return (
    <Page
      href="/app/campaign/list"
      title={`Campaign ${params.id ? "Update" : "Create"}`}
    >
      <Box display="flex" flexDirection="column" m={2} justifyContent="center">
        <Container maxWidth="lg">
          <Formik
            initialValues={{
              name: "",
              campaign_type: "",
              campaign_beneficiary: "",
              campaign_goal: "",
              domain_id: "",
              sub_domain_id: "",
              stream_id: "",
              start_date: "",
              end_date: "",
              mode_of_campaign1: [],
              stakeholders_asscociated1: [],
              learning_opportunities1: [],
              state_id: [],
              district_id: [],
              block_id: [],
              logo: "",
              brief: "",
              education: "",
              work_experience: "",
              type_of_phone: "",
              other_type_of_phone: "",
              no_of_hours_committed: "",
              learning_module_summary: "",
              learning_module_url: "",
              learning_module_summary_ngo: "",
              learning_module_url_ngo: "",
              your_role_in_this_campaign: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .required("Campaign name is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed.")
                .max(50, "Name must be less than 50 characters"),
              campaign_type: Yup.string().required("Campaign type is required"),
              campaign_beneficiary: Yup.string()
                .required("Campaign beneficiary is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
              campaign_goal: Yup.string()
                .required("Campaign goal is required"),
              domain_id: Yup.string().required("Domain name is required"),
              sub_domain_id: Yup.string().required(
                "Sub-domain name is required"
              ),
              stream_id: Yup.string().required("Stream name is required"),
              mode_of_campaign1: Yup.array().min(1, "Select at lease one"),
              stakeholders_asscociated1: Yup.array().min(
                1,
                "Select at lease one"
              ),
              state_id: Yup.array().min(1, "Select at lease one State"),
              district_id: Yup.array().min(1, "Select at least one District"),
              block_id: Yup.array().min(1, "Select at least one Block"),
              learning_opportunities1: Yup.array().min(
                1,
                "Select at least one"
              ),
              start_date: Yup.date()
                .nullable()
                .required("Start date is required"),
              end_date: Yup.date()
                .nullable()
                .transform(parseDateString)
                .min(
                  Yup.ref("start_date"),
                  "End Date cannot be before start date"
                ),
              logo: Yup.string(),
              brief: Yup.string()
                .required("Brief is required")
                .max(200, "Breif must be less than 200 characters"),
              education: Yup.string().required("Education is required"),
              your_role_in_this_campaign: Yup.string()
                .required("Your role is required")
                .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed.")
                .max(200, "Your role must be less than 200 characters"),
              work_experience: Yup.string().required(
                "Work experience is required"
              ),
              type_of_phone: Yup.string().required("Type of phone is required"),
              learning_module_summary: Yup.string().required(
                "Learning module summary is required"
              ),
              learning_module_url: Yup.string().required(
                "Learning module url is required"
              ),
              learning_module_summary_ngo: Yup.string().required(
                "Learning module summary is required"
              ),
              learning_module_url_ngo: Yup.string().required(
                "Learning module url is required"
              ),
              no_of_hours_committed: Yup.number()
                .integer()
                .moreThan(0, "Value cannot be less than 0")
                .required(
                  "Number of hours to be committed per week is required"
                ),
            })}
            onSubmit={(data) => {
              if (params.id) {
                if (!data.end_date) data["end_date"] = null;
                data["mode_of_campaign"] = data.mode_of_campaign1.join(", ");
                data[
                  "stakeholders_asscociated"
                ] = data.stakeholders_asscociated1.join(", ");
                data[
                  "learning_opportunities"
                ] = data.learning_opportunities1.join(", ");
                data["id"] = parseInt(params.id);
                dispatch(updateAction(data));
              } else {
                if (!data.end_date) data["end_date"] = null;
                data["mode_of_campaign"] = data.mode_of_campaign1.join(", ");
                data[
                  "stakeholders_asscociated"
                ] = data.stakeholders_asscociated1.join(", ");
                data[
                  "learning_opportunities"
                ] = data.learning_opportunities1.join(", ");
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
              resetForm,
            }) {
              useEffect(() => {
                if (params.id) {
                  dispatch(getCampaignByIdAction(params.id));
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, []);

              useEffect(() => {
                if (campaigns?.data?.data?.length && params.id) {
                  let d = campaigns.data.data[0];

                  const fields = [
                    "name",
                    "campaign_type",
                    "campaign_beneficiary",
                    "campaign_goal",
                    "domain_id",
                    "sub_domain_id",
                    "stream_id",
                    "start_date",
                    "mode_of_campaign",
                    "stakeholders_asscociated",
                    "learning_opportunities",
                    "state_id",
                    "district_id",
                    "block_id",
                    "logo",
                    "brief",
                    "education",
                    "work_experience",
                    "type_of_phone",
                    "other_type_of_phone",
                    "your_role_in_this_campaign",
                    "learning_module_summary",
                    "learning_module_url",
                    "learning_module_summary_ngo",
                    "learning_module_url_ngo",
                    "no_of_hours_committed",
                  ];

                  setFieldValue("end_date", d.end_date ? d.end_date : "");
                  setFieldValue(
                    "end_date",
                    d.end_date ? moment(d.end_date).format("YYYY-MM-DD") : ""
                  );
                  setFieldValue(
                    "mode_of_campaign1",
                    d.mode_of_campaign.replace(/\s/g, "").split(",")
                  );
                  setFieldValue(
                    "stakeholders_asscociated1",
                    d.stakeholders_asscociated.replace(/\s/g, "").split(",")
                  );
                  setFieldValue(
                    "learning_opportunities1",
                    d.learning_opportunities.replace(/\s/g, "").split(",")
                  );

                  fields.forEach((field) =>
                    setFieldValue(field, d[field], false)
                  );
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [campaigns]);

              useEffect(() => {
                if (values.state_id?.length > 0) {
                  stateChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.state_id]);

              useEffect(() => {
                if (values.district_id?.length > 0) {
                  // console.log("sureesh");
                  districtChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.district_id]);

              useEffect(() => {
                if (values.domain_id) {
                  domainChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.domain_id]);

              useEffect(() => {
                if (values.sub_domain_id) {
                  subDomainChange();
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [values.sub_domain_id]);

              useEffect(() => {
                if (districts?.data?.data?.length) {
                  let dIds = [];
                  if (values.district_id.length) {
                    for (const el of values.district_id) {
                      let idCheck = districts.data.data.find(
                        (e) => e.id === parseInt(el)
                      );
                      if (idCheck) {
                        dIds.push(el);
                      }
                    }
                  }
                  setFieldValue("district_id", dIds);
                }

                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [districts?.data?.data]);

              useEffect(() => {
                if (blocks?.data?.data?.length) {
                  let bIds = [];
                  if (values.block_id?.length) {
                    for (const el of values.block_id) {
                      let idCheck = blocks.data.data.find(
                        (e) => e.id === parseInt(el)
                      );
                      if (idCheck) {
                        bIds.push(el);
                      }
                    }
                  }
                  setFieldValue("block_id", bIds);
                }
                // eslint-disable-next-line react-hooks/exhaustive-deps
              }, [blocks?.data?.data]);

              const stateChange = async (e) => {
                let stateId = "";
                if (e?.target.value) {
                  stateId = e.target.value;
                  const stateIds = e.target.value.map((n) => n.toString());
                  if (stateIds[stateIds.length - 1] === "all") {
                    const ids = statesData?.data?.map((state) =>
                      state.id.toString()
                    );
                    setFieldValue(
                      "state_id",
                      stateIds.length - 1 === ids.length ? [] : ids
                    );
                    dispatch(
                      DistrictListAction({
                        fetched: "All",
                        state_id: ids.join(","),
                      })
                    );
                    return;
                  }
                  setFieldValue("state_id", stateIds, false);
                  if (stateIds.length === 0) {
                    setFieldValue("district_id", [], false);
                    setFieldValue("block_id", [], false);
                  }
                } else {
                  stateId = values.state_id;
                }
                dispatch(
                  DistrictListAction({
                    fetched: "All",
                    state_id: stateId.join(","),
                  })
                );
              };

              const districtChange = async (e) => {
                let districtId;
                if (e !== "" && e !== undefined && e.target.value) {
                  districtId = e.target.value;
                  const districtIds = districtId?.map((n) => n.toString());
                  if (districtIds[districtIds.length - 1] === "all") {
                    const ids = districts?.data?.data?.map((district) =>
                      district.id.toString()
                    );
                    setFieldValue(
                      "district_id",
                      districtIds.length - 1 === ids.length ? [] : ids
                    );
                    dispatch(
                      blockListAction({
                        fetched: "All",
                        district_id: ids.join(","),
                      })
                    );
                    return;
                  }
                  setFieldValue("district_id", districtIds, false);
                } else {
                  districtId = values.district_id;
                }
                dispatch(
                  blockListAction({
                    fetched: "All",
                    district_id: districtId.join(","),
                  })
                );
              };

              const blockChange = (e) => {
                if (e?.target?.value) {
                  const blockIds = e.target.value;
                  if (blockIds[blockIds.length - 1] === "all") {
                    const ids = blocks?.data?.data?.map((block) =>
                      block.id.toString()
                    );
                    setFieldValue(
                      "block_id",
                      blockIds.length - 1 === ids.length ? [] : ids
                    );
                    return;
                  }
                  setFieldValue(
                    "block_id",
                    blockIds.map((n) => n.toString())
                  );
                }
              };

              const domainChange = async (e) => {
                let domainId = "";
                if (e !== undefined && e.target.value) {
                  domainId = e.target.value;
                  setFieldValue("domain_id", e.target.value, false);
                } else {
                  domainId = values.domain_id;
                }
                dispatch(
                  subDomainListAction({ fetched: "All", domain_id: domainId })
                );
              };

              const subDomainData = useSelector((state) => {
                return state.SubDomain.data;
              });

              const subDomainChange = async (e) => {
                let subDomainId = "";
                if (e !== undefined && e.target.value) {
                  subDomainId = e.target.value;
                  setFieldValue("sub_domain_id", e.target.value, false);
                } else {
                  subDomainId = values.sub_domain_id;
                }
                dispatch(
                  streamListAction({
                    fetched: "All",
                    sub_domain_id: subDomainId,
                  })
                );
              };

              const streamData = useSelector((state) => {
                return state.Stream.data;
              });

              const handleAddLogo = async (e) => {
                const file = e.target.files[0];
                let extention = ["png", "jpg", "JPEG", "jpeg", "svg"];
                if (file !== undefined) {
                  let ext = file.type.split("/");
                  if (ext.length && extention.includes(ext[1])) {
                    let data = await fetchWrapper.s3UploadFile(file);
                    if (data.success) {
                      setFieldValue("logo", data.url, false);
                    } else {
                      toast.error(data.message);
                    }
                  } else {
                    toast.error("Please add png, jpg, JPEG, jpeg or svg only");
                  }
                }
              };

              const handleEditorChange = (name, htmlValue) => {
                setFieldValue(name, htmlValue);
              };

              useEffect(() => {
                console.log("vau: ", values);
              }, [values]);

              return (
                <form onSubmit={handleSubmit}>
                  <Card>
                    <CardContent>
                      <Grid container spacing={3}>
                        <CustomInput
                          label="Name"
                          touched={touched.name}
                          errorText={errors.name}
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required={true}
                          value={values.name}
                          compaignID={params.id}
                        />
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.campaign_type && errors.campaign_type
                            )}
                            fullWidth
                            helperText={
                              touched.campaign_type && errors.campaign_type
                            }
                            label="Select campaign type"
                            name="campaign_type"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.campaign_type}
                            variant="outlined"
                            required
                          >
                            <option value=""></option>
                            <option value="1">New</option>
                            <option value="2">Existing</option>
                          </TextField>
                        </Grid>
                        <CustomInput
                          label="Campaign Beneficiary"
                          touched={touched.campaign_beneficiary}
                          errorText={errors.campaign_beneficiary}
                          name="campaign_beneficiary"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required={true}
                          value={values.campaign_beneficiary}
                          compaignID={params.id}
                        />
                        <CustomInput
                          label="Campaign Goal"
                          touched={touched.campaign_goal}
                          errorText={errors.campaign_goal}
                          name="campaign_goal"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required={true}
                          value={values.campaign_goal}
                          compaignID={params.id}
                        />

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.start_date && errors.start_date
                            )}
                            fullWidth
                            helperText={touched.start_date && errors.start_date}
                            label="Start date"
                            name="start_date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            InputLabelProps={{ shrink: true }}
                            value={moment(values.start_date).format(
                              "YYYY-MM-DD"
                            )}
                            variant="outlined"
                            type="date"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(touched.end_date && errors.end_date)}
                            fullWidth
                            helperText={touched.end_date && errors.end_date}
                            label="End date"
                            name="end_date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            InputLabelProps={{ shrink: true }}
                            value={moment(values.end_date).format("YYYY-MM-DD")}
                            variant="outlined"
                            type="date"
                          />
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.mode_of_campaign1 &&
                              errors.mode_of_campaign1
                            )}
                          >
                            <InputLabel id="select-outlined-label">
                              Mode of Campaign
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Mode of Campaign"
                              multiple
                              value={values.mode_of_campaign1}
                              name="mode_of_campaign1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  campaignMode,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {campaignMode.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.mode_of_campaign1.indexOf(obj.id) >
                                        -1
                                        ? true
                                        : false
                                    }
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.mode_of_campaign1 &&
                                errors.mode_of_campaign1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.stakeholders_asscociated1 &&
                              errors.stakeholders_asscociated1
                            )}
                          >
                            <InputLabel id="select-outlined-label">
                              Stakeholders Associated
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Stakeholders Associated"
                              multiple
                              value={values.stakeholders_asscociated1}
                              name="stakeholders_asscociated1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  stakeHolders,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {stakeHolders.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={
                                      values.stakeholders_asscociated1.indexOf(
                                        obj.id
                                      ) > -1
                                        ? true
                                        : false
                                    }
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.stakeholders_asscociated1 &&
                                errors.stakeholders_asscociated1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.learning_opportunities1 &&
                              errors.learning_opportunities1
                            )}
                          >
                            <InputLabel id="select-outlined-label">
                              Learning Opportunities
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Learning Opportunities"
                              multiple
                              value={values.learning_opportunities1}
                              name="learning_opportunities1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  learningOpportunities,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {learningOpportunities.map((obj) => (
                                <MenuItem key={obj.id} value={obj.id}>
                                  <Checkbox
                                    color="primary"
                                    checked={values.learning_opportunities1?.includes(
                                      obj.id
                                    )}
                                  />
                                  <ListItemText primary={obj.name} />
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {touched.learning_opportunities1 &&
                                errors.learning_opportunities1}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(touched.state_id && errors.state_id)}
                          >
                            <InputLabel id="select-outlined-label">
                              Select State
                            </InputLabel>
                            <Select
                              label="Select State"
                              multiple
                              className="chipsContainer"
                              value={values.state_id || []}
                              name="state_id"
                              onChange={stateChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  statesData?.data,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {statesData?.data?.length && (
                                <MenuItem value="all">
                                  <Checkbox
                                    checked={
                                      statesData?.data?.length > 0 &&
                                      values?.state_id?.length ===
                                      statesData?.data?.length
                                    }
                                    indeterminate={
                                      values?.state_id?.length > 0 &&
                                      values?.state_id?.length <
                                      statesData?.data?.length
                                    }
                                  />
                                  <ListItemText primary="Select All" />
                                </MenuItem>
                              )}
                              {statesData?.data?.length &&
                                statesData.data?.map((state) => (
                                  <MenuItem
                                    key={state.id}
                                    value={state.id.toString()}
                                  >
                                    <Checkbox
                                      color="primary"
                                      checked={values.state_id?.includes(
                                        state.id.toString()
                                      )}
                                    />
                                    <ListItemText primary={state.name} />
                                  </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                              {touched.state_id && errors.state_id}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(
                              touched.district_id && errors.district_id
                            )}
                          >
                            <InputLabel id="select-outlined-label">
                              Select District
                            </InputLabel>
                            <Select
                              label="Select District"
                              multiple
                              className="chipsContainer"
                              value={values.district_id || []}
                              name="district_id"
                              onChange={districtChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  districts?.data?.data,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {districts?.data?.data?.length && (
                                <MenuItem value="all">
                                  <Checkbox
                                    checked={
                                      districts?.data?.data?.length > 0 &&
                                      values?.district_id?.length ===
                                      districts?.data?.data?.length
                                    }
                                    indeterminate={
                                      values?.district_id?.length > 0 &&
                                      values?.district_id?.length <
                                      districts?.data?.data?.length
                                    }
                                  />
                                  <ListItemText primary="Select All" />
                                </MenuItem>
                              )}
                              {districts?.data?.data?.length &&
                                districts.data.data.map((dist) => (
                                  <MenuItem
                                    key={dist.id}
                                    value={dist.id.toString()}
                                  >
                                    <Checkbox
                                      color="primary"
                                      checked={values.district_id?.includes(
                                        dist.id.toString()
                                      )}
                                    />
                                    <ListItemText primary={dist.name} />
                                  </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                              {touched.district_id && errors.district_id}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <FormControl
                            required
                            variant="outlined"
                            fullWidth
                            error={Boolean(touched.block_id && errors.block_id)}
                          >
                            <InputLabel id="select-outlined-label">
                              Select Block
                            </InputLabel>
                            <Select
                              className="chipsContainer"
                              label="Select Block"
                              multiple
                              value={values.block_id || []}
                              name="block_id"
                              onChange={blockChange}
                              onBlur={handleBlur}
                              renderValue={(selected) => {
                                return selectedLableValueMultiselect(
                                  selected,
                                  blocks?.data?.data,
                                  "id",
                                  "name"
                                ).map((val, i) => (
                                  <CustomChip key={i} value={val} />
                                ));
                              }}
                            >
                              {blocks?.data?.data?.length && (
                                <MenuItem value="all">
                                  <Checkbox
                                    checked={
                                      blocks?.data?.data?.length > 0 &&
                                      values?.block_id?.length ===
                                      blocks?.data?.data?.length
                                    }
                                    indeterminate={
                                      values?.block_id?.length > 0 &&
                                      values?.block_id?.length <
                                      blocks?.data?.data?.length
                                    }
                                  />
                                  <ListItemText primary="Select All" />
                                </MenuItem>
                              )}
                              {blocks?.data?.data?.length &&
                                blocks.data.data.map((dist) => (
                                  <MenuItem
                                    key={dist.id}
                                    value={dist.id.toString()}
                                  >
                                    <Checkbox
                                      color="primary"
                                      checked={values.block_id?.includes(
                                        dist.id.toString()
                                      )}
                                    />
                                    <ListItemText primary={dist.name} />
                                  </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>
                              {touched.block_id && errors.block_id}
                            </FormHelperText>
                          </FormControl>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.domain_id && errors.domain_id
                            )}
                            fullWidth
                            helperText={touched.domain_id && errors.domain_id}
                            label="Select domain"
                            name="domain_id"
                            onChange={(e) => domainChange(e)}
                            InputLabelProps={{
                              shrink: Boolean(values.domain_id),
                            }}
                            onBlur={handleBlur}
                            select
                            required
                            SelectProps={{ native: true }}
                            value={values.domain_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {domainData.data !== undefined &&
                              domainData.data.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.sub_domain_id && errors.sub_domain_id
                            )}
                            fullWidth
                            helperText={
                              touched.sub_domain_id && errors.sub_domain_id
                            }
                            label="Select sub domain"
                            InputLabelProps={{
                              shrink: Boolean(values.sub_domain_id),
                            }}
                            required
                            name="sub_domain_id"
                            onChange={(e) => subDomainChange(e)}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.sub_domain_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {subDomainData.data !== undefined &&
                              subDomainData.data.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>

                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.stream_id && errors.stream_id
                            )}
                            fullWidth
                            helperText={touched.stream_id && errors.stream_id}
                            label="Select stream"
                            name="stream_id"
                            required
                            InputLabelProps={{
                              shrink: Boolean(values.stream_id),
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            SelectProps={{ native: true }}
                            value={values.stream_id}
                            variant="outlined"
                          >
                            <option value=""></option>
                            {streamData.data !== undefined &&
                              streamData.data.map((el) => (
                                <option key={el.id} value={el.id}>
                                  {el.name}
                                </option>
                              ))}
                          </TextField>
                        </Grid>
                        <CustomInput
                          label="Brief"
                          touched={touched.brief}
                          errorText={errors.brief}
                          name="brief"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required={true}
                          value={values.brief}
                          compaignID={params.id}
                        />
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.education && errors.education
                            )}
                            fullWidth
                            helperText={touched.education && errors.education}
                            label="Select education"
                            name="education"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            select
                            required
                            SelectProps={{ native: true }}
                            value={values.education}
                            variant="outlined"
                          >
                            <option value=""></option>
                            <option value="1">Below 10th</option>
                            <option value="2">10th Passed</option>
                            <option value="3">12 Passed</option>
                            <option value="4">Graduate</option>
                            <option value="5">PG</option>
                          </TextField>
                        </Grid>

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
                            required
                            SelectProps={{ native: true }}
                            value={values.work_experience}
                            variant="outlined"
                          >
                            <option value=""></option>
                            <option value="1">Yes</option>
                            <option value="2">No</option>
                          </TextField>
                        </Grid>
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
                            required
                            SelectProps={{ native: true }}
                            value={values.type_of_phone}
                            variant="outlined"
                          >
                            <option value=""></option>
                            <option value="1">Android</option>
                            <option value="2">Iphone</option>
                            <option value="3">Feature phone</option>
                            <option value="4">Others</option>
                          </TextField>
                        </Grid>
                        {values.type_of_phone === "4" && (
                          <Grid item md={6} xs={12}>
                            <TextField
                              fullWidth
                              label="Enter type of phone"
                              variant="outlined"
                              required
                              name="other_type_of_phone"
                              value={values.other_type_of_phone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </Grid>
                        )}
                        <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.no_of_hours_committed &&
                              errors.no_of_hours_committed
                            )}
                            fullWidth
                            type="number"
                            helperText={
                              touched.no_of_hours_committed &&
                              errors.no_of_hours_committed
                            }
                            label="Number of hours to be committed per week"
                            name="no_of_hours_committed"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            value={values.no_of_hours_committed}
                            variant="outlined"
                          />
                        </Grid>
                        <CustomInput
                          label="Your Role in this Campaign"
                          touched={touched.your_role_in_this_campaign}
                          errorText={errors.your_role_in_this_campaign}
                          name="your_role_in_this_campaign"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required={true}
                          value={values.your_role_in_this_campaign}
                          compaignID={params.id}
                        />

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
                                onChange={handleAddLogo}
                              />
                              Select Logo
                            </Button>
                            {values.logo !== "" && (
                              <img
                                height="52"
                                src={values.logo}
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
                            error={Boolean(touched.logo && errors.logo)}
                            fullWidth
                            helperText={touched.logo && errors.logo}
                            label="Logo URL"
                            name="logo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.logo}
                            variant="outlined"
                          />
                        </Grid>
                        {/* <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.learning_module_url &&
                              errors.learning_module_url
                            )}
                            fullWidth
                            helperText={
                              touched.learning_module_url &&
                              errors.learning_module_url
                            }
                            label="Learning Module URL"
                            name="learning_module_url"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.learning_module_url}
                            variant="outlined"
                            required
                          />
                        </Grid> */}
                        <EditorTextArea
                          onChange={handleEditorChange}
                          value={values.learning_module_summary}
                          errors={errors.learning_module_summary}
                          field={"learning_module_summary"}
                        />
                        {/* <Grid item md={6} xs={12}>
                          <TextField
                            error={Boolean(
                              touched.learning_module_url_ngo &&
                              errors.learning_module_url_ngo
                            )}
                            fullWidth
                            helperText={
                              touched.learning_module_url_ngo &&
                              errors.learning_module_url_ngo
                            }
                            label="Learning Module URL NGO"
                            name="learning_module_url_ngo"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.learning_module_url_ngo}
                            variant="outlined"
                            required
                          />
                        </Grid> */}
                        <EditorTextArea
                          onChange={handleEditorChange}
                          value={values.learning_module_summary_ngo}
                          errors={errors.learning_module_summary_ngo}
                          field={"learning_module_summary_ngo"}
                        />
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
export default CampaignForm;
