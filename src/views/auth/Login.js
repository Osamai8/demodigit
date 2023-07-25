import { useEffect, useState } from "react";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Navigate } from "react-router";
// import { Link } from "react-router-dom";
import * as Crypto from "crypto-js";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "src/Redux/Auth/action";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const isError = useSelector((state) => state.auth.isError);

  const [passVisible, setPassVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focus, setFocus] = useState({
    username: false,
    password: false,
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFocus = (e) => {
    setFocus({ ...focus, [e.target.name]: true });
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setFocus({
        ...focus,
        [e.target.name]: false,
      });
    }
  };

  const handlePassVisible = () => {
    setPassVisible(!passVisible);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (username && password) {
      setSubmitting(true);
      // const recaptchaValue = recaptchaRef.current.getValue();
      const random = Math.random();
      let passwordHAsh = Crypto.HmacSHA256("Admin@123", "ADC!@#$1234").toString();
      let passwordH = Crypto.HmacSHA256(
        passwordHAsh,
        random.toString()
      ).toString();
      dispatch(
        loginUser({
          value: "9582998949",
          password: passwordH,
          random: random.toString(),
          // recaptcha: recaptchaValue
        })
      );
    }
  };

  useEffect(() => {
    if (isError) setSubmitting(false);
  }, [isError]);

  if (isAuth) {
    return <Navigate to="/app/farmer_survey" />;
  }

  return (
    <div className="loginWrapper">
      <div
        className="loginLeft"
        style={{ backgroundImage: `url(https://w0.peakpx.com/wallpaper/288/771/HD-wallpaper-tea-plantation-green-harvesting-leaves-farming-farmer-land-cultivation.jpg)` }}
      >
        <div className="loginLogoWrapper">
          <img src="https://cdn.jsdelivr.net/npm/@egovernments/digit-ui-css/img/browser-icon.png" alt="Logo" className="login-logo" />
        </div>
      </div>
      <div className="loginRight">
        <div className="loginTitleWrapper">
          <h2 className="loginTitle">DFS Demo</h2>
          <p>Login into your account</p>
        </div>

        <form autoComplete="off" className="loginForm" onSubmit={handleLogin}>
          <div className="loginFormInner">
            <label htmlFor="username">Username</label>
            <div className={`loginInputWrapper ${focus.username && "focus"}`}>
              <PermIdentityIcon />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          <div className="loginFormInner">
            <label htmlFor="password">Password</label>
            <div className={`loginInputWrapper ${focus.password && "focus"}`}>
              <HttpsOutlinedIcon />
              <input
                type={passVisible ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                value={formData.password}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />

              {formData.password && (
                <div className="loginVisible" onClick={handlePassVisible}>
                  {passVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              )}
            </div>
            {/* <div className="forgotPass">
              <Link to="/signup">New to ADC?</Link>
              <Link to="/forgetpassword">Forgot password?</Link>
            </div> */}
          </div>

          <button className="loginBtn" type="submit">
            {submitting ? (
              <CircularProgress size={20} color="success" />
            ) : (
              "login"
            )}
          </button>

          {isError && (
            <Alert severity="error">
              <strong>{errorMessage}</strong>
            </Alert>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
