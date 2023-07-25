import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import { toast } from "react-toastify";
import "./Login.css";
import { useEffect, useState } from "react";
import { resetPassword, verifyToken } from "../../Redux/Auth/action";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import * as Crypto from "crypto-js";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const ResetPasswordSuccess = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const initialResponse = useSelector((state) => state.auth);
  const resetPassResponse = useSelector((state) => state.resetPass);
  const [resetSuccess, setResetSucces] = useState(false);
  const [focus, setFocus] = useState({
    new_password: false,
    confirm_password: false,
  });
  const [token, setToken] = useState("");

  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });

  const [passVisible, setPassVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.new_password) {
      if (formData.new_password.length > 10) {
        if (formData.new_password !== formData.confirm_password) {
          toast.warn("Passwords must match!");
        } else {
          let password1HAsh = Crypto.HmacSHA256(
            formData.new_password,
            "ADC!@#$1234"
          ).toString();
          let password2HAsh = Crypto.HmacSHA256(
            formData.confirm_password,
            "ADC!@#$1234"
          ).toString();

          dispatch(
            resetPassword({
              new_password: password1HAsh,
              confirm_password: password2HAsh,
              email: initialResponse?.data?.data.user,
            })
          );
        }
      } else {
        toast.warn("Password must have at least 10 characters");
      }
    }
  };

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

  useEffect(() => {
    const pathToken = window.location.pathname.split("/")[2];
    if (pathToken) {
      setToken(pathToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(verifyToken({ reset_password_token: token }));
    }
  }, [token, dispatch]);

  // useEffect(() => {
  //   if(initialResponse?.data !== null){
  //     console.log("dk: ", initialResponse.data.data.user)
  //   }
  // }, [initialResponse]);

  useEffect(() => {
    if (resetPassResponse?.data !== null) {
      toast.success("Your password changed successfully");
      setResetSucces(true);
    }
  }, [resetPassResponse]);

  if (isAuth) {
    return <Navigate to="/" />;
  }

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
      <div className="loginRight">
        <div className="loginTitleWrapper">
          <h2 className="loginTitle">Hey there!</h2>
          <p>You can reset your password now</p>
        </div>
        {resetSuccess ? (
          <div
            className="loginForm"
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2>Your password changed successfully</h2>
            <Link
              to="/login"
              className="loginBtn"
              style={{ textAlign: "center" }}
            >
              login
            </Link>
          </div>
        ) : initialResponse?.isLoading ? (
          <CircularProgress color="primary" size={80} />
        ) : initialResponse?.data !== null ? (
          <form
            autoComplete="off"
            className="loginForm"
            onSubmit={handleSubmit}
          >
            <div className="loginFormInner">
              <label htmlFor="new_password">New Password</label>
              <div
                className={`loginInputWrapper ${focus.new_password && "focus"}`}
              >
                <HttpsOutlinedIcon />
                <input
                  type={passVisible ? "text" : "password"}
                  id="new_password"
                  name="new_password"
                  autoComplete="off"
                  value={formData.new_password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
                {formData.new_password && (
                  <div
                    className="loginVisible"
                    onClick={() => {
                      setPassVisible(!passVisible);
                    }}
                  >
                    {passVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </div>
                )}
              </div>
            </div>
            <div className="loginFormInner">
              <label htmlFor="confirm_password">Confirm Password</label>
              <div
                className={`loginInputWrapper ${focus.confirm_password &&
                  "focus"}`}
              >
                <HttpsOutlinedIcon />
                <input
                  type={passVisible ? "text" : "password"}
                  id="confirm_password"
                  name="confirm_password"
                  autoComplete="off"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                />
              </div>
            </div>
            <button type="submit" className="loginBtn">
              {resetPassResponse?.loading ? (
                <CircularProgress color="success" size={50} />
              ) : (
                "reset"
              )}
            </button>
          </form>
        ) : (
          <>
            <h1>An error occured</h1>
            <p>
              Your token might have expired please try reseting password again
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordSuccess;
