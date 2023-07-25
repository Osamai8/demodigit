import { Formik } from "formik";
import * as Yup from "yup";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import AccessibilityNewOutlinedIcon from "@material-ui/icons/AccessibilityNewOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import { CircularProgress } from "@material-ui/core";
import Input from "src/components/Input";
import "./Login.css";
import Select from "src/components/Input/Select";
import { Link } from "react-router-dom";
import MultiSelect from "src/components/Input/MultiSelect";

const Signup = () => {
  const initialValues = {
    username: "",
    fullName: "",
    email: "",
    mobileNumber: "",
    role: "",
    password: "",
    confirmPassword: "",
  };

  const signupSchema = Yup.object().shape({
    username: Yup.string()
      .matches(/^[\w\-\s]+$/, "Only alphanumeric values allowed")
      .required("Username is required"),
    fullName: Yup.string()
      .required("Full Name is required")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed."),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    mobileNumber: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "Invalid mobile number")
      .required("Mobile number is required"),
    role: Yup.string().required("Please select your role"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="loginWrapper">
      <div
        className="loginLeft"
        style={{ backgroundImage: `url(/image/skybg.jpg)` }}
      >
        <div className="loginLogoWrapper">
          <img src="/image/adc-logo2.png" alt="Logo" className="login-logo" />
        </div>
        <div className="loginHero">
          <h1>Join compaigns.</h1>
          <h1>Raise your voice.</h1>
          <h1>Bring change.</h1>
        </div>
      </div>

      <div className="loginRight signup">
        <div className="loginTitleWrapper">
          <h2 className="loginTitle">Welcome to ADC!</h2>
          <p>Create your account for free</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={signupSchema}
          onSubmit={(data) => {
            console.log("Submitted: ", data);
          }}
        >
          {function Render({
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            errors,
            isSubmitting,
            touched,
          }) {
            return (
              <form
                autoComplete="off"
                className="loginForm"
                onSubmit={handleSubmit}
              >
                <MultiSelect />
                <Input
                  label="Username"
                  name="username"
                  iconLeft={<PermIdentityIcon />}
                  helperText={touched.username && errors.username}
                  error={Boolean(touched.username && errors.username)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="false"
                />

                <Input
                  label="Full Name"
                  name="fullName"
                  iconLeft={<AccountCircleOutlinedIcon />}
                  helperText={touched.fullName && errors.fullName}
                  error={Boolean(touched.fullName && errors.fullName)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="nothing"
                />

                <Input
                  label="Email"
                  name="email"
                  iconLeft={<EmailOutlinedIcon />}
                  helperText={touched.email && errors.email}
                  error={Boolean(touched.email && errors.email)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />

                <Input
                  label="Mobile Number"
                  name="mobileNumber"
                  iconLeft={<CallOutlinedIcon />}
                  helperText={touched.mobileNumber && errors.mobileNumber}
                  error={Boolean(touched.mobileNumber && errors.mobileNumber)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="nothing"
                />

                <Select
                  label="Select Role"
                  name="role"
                  iconLeft={<AccessibilityNewOutlinedIcon />}
                  helperText={touched.role && errors.role}
                  error={Boolean(touched.role && errors.role)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </Select>

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  iconLeft={<HttpsOutlinedIcon />}
                  helperText={touched.password && errors.password}
                  error={Boolean(touched.password && errors.password)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="nothing"
                />

                <Input
                  label="Confirm Password"
                  type="password"
                  name="confirmPassword"
                  iconLeft={<HttpsOutlinedIcon />}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="nothing"
                />
                <Link className="loginFormNav" to="/login">
                  Already have an account?
                </Link>

                <button className="loginBtn" type="submit">
                  {isSubmitting ? (
                    <CircularProgress size={20} color="#fff" />
                  ) : (
                    "signup"
                  )}
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
