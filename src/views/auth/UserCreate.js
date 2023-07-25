import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  Input,
  ListItemText,
  MenuItem,
  NativeSelect,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { create, update } from "src/Redux/CreateUser/action";
import { fetchWrapper } from "src/services/http_requests";
import {
  DISTRICT_COORDINATOR,
  FIELD_ENGINEER,
  STATE_COORDINATOR,
} from "../../utils/constant";
import { selectedLableValueMultiselect } from "../../utils/halper";
import "./UserCreate.css";
// import ReCAPTCHA from 'react-google-recaptcha';
const baseUrl = process.env.REACT_APP_API_URL;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const UserCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { id } = useParams();
  // const recaptchaRef = React.createRef();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [userName, setUsername] = React.useState("");
  const [name, setName] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [roleId, setRole] = useState("");
  const [StateId, setStateId] = useState("");
  const [DistrictId, setDistrictId] = useState("");
  const [BlockId, setBlockId] = useState([]);
  const [PanchayatId, setPanchayatId] = useState([]);
  const [VillageId, setVillageId] = useState([]);

  const [statesList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [blocksList, setBlocksList] = useState([]);
  const [GrampanchayatsList, setGrampanchayatsList] = useState([]);
  const [VillagesList, setVillageList] = useState([]);

  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUserNameError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [roleError, setRoleError] = useState(null);
  const [stateError, setStateError] = useState(null);
  const [districtError, setDistrictError] = useState(null);
  const [blockError, setBlockError] = useState(null);
  const [panchayatError, setPanchayatError] = useState(null);
  const [villageError, setVillageError] = useState(null);
  const redirectToNewPage = useSelector(
    (state) => state.user.redirectToNewPage
  );
  const createUser = (e) => {
    e.preventDefault();
    let obj = {
      name,
      email,
      mobile,
      role_id: roleId,
    };
    if (!id) {
      obj["password"] = password;
      obj["username"] = userName;
    } else {
      obj["id"] = parseInt(id);
    }
    if (roleId === FIELD_ENGINEER) {
      obj["village_id"] = VillageId;
    }
    if (roleId === STATE_COORDINATOR) {
      obj["state_id"] = StateId;
    }
    if (roleId === DISTRICT_COORDINATOR) {
      obj["district_id"] = DistrictId;
    }

    let flag = 0;
    if (nameValidation(obj.name) !== null) {
      setNameError(nameValidation(name, obj.name));
      flag++;
    }
    if (!id) {
      if (usernameValidation("Username", obj.username) !== null) {
        setUserNameError(usernameValidation(userName, obj.username));
        flag++;
      }
    }
    if (emailValidation(obj.email) !== null) {
      setEmailError(emailValidation(obj.email));
      flag++;
    }
    if (!id) {
      if (passValidation(obj.password) !== null) {
        setPassError(passValidation(obj.password));
        flag++;
      }
    }
    if (mobileValidation(obj.mobile) !== null) {
      setMobileError(mobileValidation(obj.mobile));
      flag++;
    }
    if (roleId === "") {
      setRoleError("Role Name is Required");
      flag++;
    }
    if (
      roleId === FIELD_ENGINEER ||
      roleId === STATE_COORDINATOR ||
      roleId === DISTRICT_COORDINATOR
    ) {
      if (StateId === "") {
        setStateError("State Name is Required");
        flag++;
      }
    }
    if (roleId === FIELD_ENGINEER || roleId === DISTRICT_COORDINATOR) {
      if (DistrictId === "") {
        setDistrictError("District Name is Required");
        flag++;
      }
    }

    if (BlockId === "" && roleId === FIELD_ENGINEER) {
      setBlockError("Block Name is Required");
      flag++;
    }
    if (PanchayatId === "" && roleId === FIELD_ENGINEER) {
      setPanchayatError("Grampanchayat Name is Required");
      flag++;
    }
    if (VillageId === "" && roleId === FIELD_ENGINEER) {
      setVillageError("Village Name is Required");
      flag++;
    }
    if (flag === 0) {
      if (id) {
        /// for update
        dispatch(update(obj));
      } else {
        dispatch(create(obj));
      }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (redirectToNewPage) {
      navigate("/app/userlist", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToNewPage]);

  useEffect(() => {
    //// for update data
    if (id) {
      async function fetchUserData() {
        let url = `${baseUrl}user/getById/${id}`;
        let data = await fetchWrapper.get(url);
        let names = "";
        let emails = "";
        let mobile = "";
        let roleids = "";
        let stateIds = "";
        let districtIds = "";
        let blockIds = [];
        let gpIds = [];
        let villageIds = [];
        if (data.success) {
          if (data.data.length) {
            for (const pf of data.data) {
              emails = pf.email;
              names = pf.name;
              mobile = pf.mobile;
              roleids = pf.role_id;
              stateIds = pf.state_id;
              districtIds = pf.district_id;
              if (pf.block_id) {
                blockIds.push(pf.block_id);
              }
              if (pf.gp_id) {
                gpIds.push(pf.gp_id);
              }
              if (pf.village_id) {
                villageIds.push(pf.village_id);
              }
            }
          }
          setEmail(emails);
          setName(names);
          setMobile(mobile);
          setRole(roleids);
          setStateId(stateIds);
          setDistrictId(districtIds);
          setBlockId([...new Set(blockIds)]);
          setPanchayatId([...new Set(gpIds)]);
          setVillageId([...new Set(villageIds)]);
        }
      }
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDistrictList("");
    setDistrictId("");
    setBlockId([]);
    setBlocksList([]);
    setPanchayatId([]);
    setGrampanchayatsList([]);
    setVillageId([]);
    setVillageList([]);
    if (roleId) {
      async function fetchState() {
        let url = `${baseUrl}state/list?fetched=All`;
        let data = await fetchWrapper.get(url);
        if (data.success) {
          setStateList(data.data);
        }
      }
      fetchState();
    }
  }, [roleId]);

  useEffect(() => {
    setBlockId([]);
    setBlocksList([]);
    setPanchayatId([]);
    setGrampanchayatsList([]);
    setVillageId([]);
    setVillageList([]);
    if (StateId) {
      async function fetchDistrict() {
        let url = `${baseUrl}district/list?StateId=${StateId}&fetched=All`;
        let data = await fetchWrapper.get(url);
        if (data.success) {
          setDistrictList(data.data);
        }
      }
      fetchDistrict();
    }
  }, [StateId]);

  useEffect(() => {
    setPanchayatId([]);
    setGrampanchayatsList([]);
    setVillageId([]);
    setVillageList([]);
    if (DistrictId) {
      async function fetchBlock() {
        let url = `${baseUrl}block/list?DistrictId=${DistrictId}&fetched=All`;
        let data = await fetchWrapper.get(url);
        if (data.success) {
          setBlocksList(data.data);
        }
      }
      fetchBlock();
    }
  }, [DistrictId]);

  useEffect(() => {
    setVillageId([]);
    setVillageList([]);
    if (BlockId.length) {
      async function fetchGp() {
        let url = `${baseUrl}grampanchayat/list?BlockId=${BlockId}&fetched=All`;
        let data = await fetchWrapper.get(url);
        if (data.success) {
          setGrampanchayatsList(data.data);
        }
      }
      fetchGp();
    }
  }, [BlockId]);

  useEffect(() => {
    if (PanchayatId.length || BlockId.length) {
      async function fetctVillage() {
        let url = `${baseUrl}village/getById?PanchayatId=${PanchayatId}&BlockId=${BlockId}&fetched=All`;
        let data = await fetchWrapper.get(url);
        if (data.success) {
          setVillageList(data.data);
        }
      }
      fetctVillage();
    }
  }, [PanchayatId, BlockId]);

  const backIndexPage = () => {
    navigate("/app/userlist", { replace: true });
  };

  // const captchaKey = process.env.REACT_APP_CAPTCHA_SITEKEY;
  return (
    <Box
      className="userCreate"
      display="flex"
      style={{ background: "#e6e6e6", height: "100vh" }}
    >
      <h1
        style={{
          marginBottom: "20px",
          margin: "50px 0 0 60px",
          fontSize: "1.7rem",
          fontWeight: 450,
        }}
        className="User__title"
      >
        {id ? "Update User" : "Create User"}
      </h1>
      <Container className="container" maxWidth="lg">
        <Box className="form__fields" display="flex" alignItems="center">
          <TextField
            error={Boolean(nameError)}
            helperText={nameError}
            fullWidth
            id="a"
            margin="normal"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setNameError(null)}
            type="text"
            className="name"
          />
          <TextField
            error={Boolean(emailError)}
            helperText={emailError}
            fullWidth
            style={{ readOnly: id ? true : false }}
            label="Email Address"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={(e) => setEmailError(null)}
            type="email"
            className="email"
          />
        </Box>
        <Box
          className="form__fields"
          display="flex"
          alignItems="cente"
          style={{ display: id ? "none" : "" }}
        >
          <TextField
            error={Boolean(usernameError)}
            helperText={usernameError}
            fullWidth
            label="User Name"
            margin="normal"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={(e) => setUserNameError(null)}
            type="text"
            className="username"
          />
          <TextField
            error={Boolean(passError)}
            helperText={passError}
            fullWidth
            label="Password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={(e) => setPassError(null)}
            type="password"
            className="password"
          />
        </Box>
        <Box className="form__fields" display="flex" alignItems="center">
          <TextField
            fullWidth
            className="mobile"
            error={Boolean(mobileError)}
            helperText={mobileError}
            label="Mobile"
            margin="normal"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            type="text"
            onFocus={(e) => setMobileError(null)}
          />
          <div className="roles">
            <NativeSelect
              fullWidth
              error={Boolean(roleError)}
              helperText={roleError}
              value={roleId}
              name="roleId"
              required
              onFocus={(e) => setRoleError(null)}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="">Role All</option>
              <option value="2">Field Engineer</option>
              <option value="3">State Coordinator</option>
              <option value="4">District Coordinator</option>
            </NativeSelect>
            {roleError && <p className="errorTag">{roleError}</p>}
          </div>
        </Box>
        <div>
          <Box className="form__fields" alignItems="center" display="flex">
            <Box
              className="state"
              style={{
                display:
                  roleId === FIELD_ENGINEER ||
                  roleId === STATE_COORDINATOR ||
                  roleId === DISTRICT_COORDINATOR
                    ? "block"
                    : "none",
              }}
            >
              <NativeSelect
                fullWidth
                value={StateId}
                name="StateId"
                onChange={(e) => setStateId(e.target.value)}
                onFocus={(e) => setStateError(null)}
              >
                <option value="">All States</option>
                {statesList !== undefined && statesList.length
                  ? statesList.map((el, i) => (
                      <option key={i} value={el.StateId}>
                        {el.StateName}
                      </option>
                    ))
                  : ""}
              </NativeSelect>
              {stateError && <p className="errorTag">{stateError}</p>}
            </Box>
            <Box
              className="district"
              style={{
                display:
                  roleId == FIELD_ENGINEER || roleId == DISTRICT_COORDINATOR
                    ? "block"
                    : "none",
              }}
            >
              <NativeSelect
                // required
                fullWidth
                value={DistrictId}
                name="DistrictId"
                onChange={(e) => setDistrictId(e.target.value)}
                onFocus={(e) => setDistrictError(null)}
              >
                <option value="">All Districts</option>
                {districtList !== undefined && districtList.length
                  ? districtList.map((el, i) => (
                      <option key={i} value={el.districtId}>
                        {el.districtname}
                      </option>
                    ))
                  : ""}
              </NativeSelect>
              {districtError && <p className="errorTag">{districtError}</p>}
            </Box>
          </Box>
          <Box alignItems="center" display="flex">
            <Box
              className="block"
              style={{
                display: roleId === FIELD_ENGINEER ? "block" : "none",
              }}
            >
              {/* <label style={{ marginBottom: '0px' }} htmlFor="">
                All Blocks
              </label> */}
              <p
                style={{
                  display: BlockId.length === 0 ? "" : "none",
                  marginBottom: "-23px",
                  color: "#263238",
                }}
              >
                All Blocks
              </p>
              <Select
                required
                fullWidth
                multiple
                value={BlockId}
                onChange={(e) => setBlockId(e.target.value)}
                onSelect={(e) => setBlockError(null)}
                onFocus={(e) => setBlockError(null)}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selectedLableValueMultiselect(
                      selected,
                      blocksList,
                      "BlockId",
                      "BlockName"
                    ).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <ListItemText primary="All Blocks" />
                </MenuItem>

                {blocksList !== undefined &&
                  blocksList.map((el) => (
                    <MenuItem key={el.BlockId} value={el.BlockId}>
                      <Checkbox checked={BlockId.indexOf(el.BlockId) > -1} />
                      <ListItemText primary={el.BlockName} />
                    </MenuItem>
                  ))}
              </Select>
              {blockError && <p className="errorTag">{blockError}</p>}
            </Box>
            <Box
              className="gram"
              style={{
                display: roleId === FIELD_ENGINEER ? "block" : "none",
              }}
            >
              <p
                style={{
                  display: PanchayatId.length === 0 ? "" : "none",
                  marginBottom: "-23px",
                  color: "#263238",
                }}
              >
                All Grampanchayats
              </p>
              <Select
                required
                fullWidth
                multiple
                value={PanchayatId}
                onChange={(e) => setPanchayatId(e.target.value)}
                onFocus={(e) => setPanchayatError(null)}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selectedLableValueMultiselect(
                      selected,
                      GrampanchayatsList,
                      "PanchayatId",
                      "PanchayatName"
                    ).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <ListItemText primary="All Grampanchayats" />
                </MenuItem>
                {GrampanchayatsList !== undefined &&
                  GrampanchayatsList.length &&
                  GrampanchayatsList.map((el) => (
                    <MenuItem key={el.PanchayatId} value={el.PanchayatId}>
                      <Checkbox
                        checked={PanchayatId.indexOf(el.PanchayatId) > -1}
                      />
                      <ListItemText primary={el.PanchayatName} />
                    </MenuItem>
                  ))}
              </Select>
              {panchayatError && <p className="errorTag">{panchayatError}</p>}
            </Box>
          </Box>
          <br />
          <Box alignItems="center" display="flex">
            <Box
              className="village"
              style={{
                display: roleId === FIELD_ENGINEER ? "block" : "none",
              }}
            >
              <p
                style={{
                  display: VillageId.length === 0 ? "" : "none",
                  marginBottom: "-23px",
                  color: "#263238",
                }}
              >
                All Villages
              </p>
              <Select
                required
                fullWidth
                multiple
                value={VillageId}
                onChange={(e) => setVillageId(e.target.value)}
                onFocus={(e) => setVillageError(null)}
                input={<Input />}
                renderValue={(selected) => (
                  <div className={classes.chips}>
                    {selectedLableValueMultiselect(
                      selected,
                      VillagesList,
                      "VillageId",
                      "VillageName"
                    ).map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <ListItemText primary="All Villages" />
                </MenuItem>
                {VillagesList !== undefined &&
                  VillagesList.length &&
                  VillagesList.map((el) => (
                    <MenuItem
                      key={el.VillageId}
                      value={el.VillageId}
                      disabled={el.isVillageId ? true : false}
                    >
                      {!el.isVillageId && (
                        <Checkbox
                          checked={VillageId.indexOf(el.VillageId) > -1}
                        />
                      )}
                      <ListItemText primary={el.VillageName} />
                    </MenuItem>
                  ))}
              </Select>
              {villageError && <p className="errorTag">{villageError}</p>}
            </Box>
          </Box>
        </div>
        <br />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            // className="submit__button"
            style={{
              background: "#3396d3",
              marginRight: "8px",
              color: "white",
            }}
            size="small"
            type="submit"
            variant="contained"
            onClick={createUser}
          >
            {id ? "Update User" : "Create User"}
          </Button>
          <Button
            onClick={() => backIndexPage()}
            color="success"
            variant="contained"
          >
            Back
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UserCreate;

const nameValidation = (fieldValue) => {
  if (fieldValue.trim() === "") {
    return `Name is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `Name needs to be at least three characters`;
  }
  return null;
};
const usernameValidation = (fieldName, fieldValue) => {
  if (fieldValue.trim() === "") {
    return `Username is required`;
  }
  if (/[^a-zA-Z -]/.test(fieldValue)) {
    return "Invalid characters";
  }
  if (fieldValue.trim().length < 3) {
    return `Username needs to be at least three characters`;
  }
  return null;
};

const emailValidation = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email)) {
    return null;
  }
  if (email.trim() === "") {
    return "Email is required";
  }
  return "Please enter a valid email";
};
const mobileValidation = (mobile) => {
  if (mobile.trim() === "") {
    return "Mobile is required";
  }
  if (/^[6-9]\d{9}$/.test(mobile) === false) {
    return "Mobile Number Invalid";
  }

  if (isNaN(mobile)) {
    return "Enter a numeric number";
  }
  if (mobile.length < 10 || mobile.length > 10) {
    return "Enter valid number";
  }
  return null;
};
const passValidation = (pass) => {
  if (pass.trim() === "") {
    return "Password is required";
  }
  if (
    pass.match(/[a-z]/g) &&
    pass.match(/[A-Z]/g) &&
    pass.match(/[0-9]/g) &&
    pass.match(/[\W]/g) &&
    pass.length >= 8
  ) {
    return null;
  }
  return 'Enter a valid password("a-z","A-Z",0-9,*&)';
};

// https://material-ui.com/components/selects/
