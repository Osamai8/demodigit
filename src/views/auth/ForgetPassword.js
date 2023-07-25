import { useEffect, useState } from "react";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import { CircularProgress } from "@material-ui/core";
import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import "./Login.css";
import { sendMailForVerification } from "src/Redux/Auth/action";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const resetPassResponse = useSelector((state) => state.auth);

  const [focus, setFocus] = useState({
    email: false,
  });
  const [formData, setFormData] = useState({
    email: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email) {
      dispatch(sendMailForVerification(formData));
    }
  };

  useEffect(() => {
    if (resetPassResponse.isError) {
      toast.error(resetPassResponse.errorMessage);
    }

    if (resetPassResponse?.data !== null) {
      toast.success(
        "A verification email has been sent to your email, Please check your email"
      );
      dispatch({ type: "SEND_EMAIL_SUCCESS", payload: null });
    }
  }, [resetPassResponse, dispatch]);

  if (resetPassResponse.isAuth) {
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
          <h2 className="loginTitle">Forgot your password?</h2>
          <p>We will help you recover your password</p>
        </div>

        <form autoComplete="off" className="loginForm" onSubmit={handleSubmit}>
          <div className="loginFormInner">
            <label htmlFor="username">Enter your email</label>
            <div className={`loginInputWrapper ${focus.email && "focus"}`}>
              <PermIdentityIcon />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.username}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                required
              />
            </div>
          </div>

          <button className="loginBtn" type="submit">
            {resetPassResponse?.isLoading ? (
              <CircularProgress size={20} color="secondary" />
            ) : (
              "send code"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
