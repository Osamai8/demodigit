import { useState } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import "./index.css";

const Input = (props) => {
  const {
    type = "text",
    label = "Label",
    name = "",
    iconLeft,
    placeHolder,
    value,
    onChange,
    onFocus,
    onBlur,
    helperText = "",
    error = false,
    autoComplete,
  } = props;

  const [passVisible, setPassVisible] = useState(false);

  const handlePassVisible = () => {
    setPassVisible(!passVisible);
  };

  return (
    <div className="customInputWrapper">
      <label
        className={`customInputLabel ${error && "customInputErrorTxt"}`}
        htmlFor={name}
      >
        {label}
      </label>
      <div className={`customInputInner ${error && "customInputErrorBorder"}`}>
        {iconLeft}
        {type === "password" ? (
          <>
            <input
              className={`${error && "customInputErrorTxt"}`}
              type={passVisible ? "text" : "password"}
              name={name}
              placeholder={placeHolder}
              value={value}
              onChange={onChange}
              onFocus={onFocus}
              onBlur={onBlur}
              autoComplete={autoComplete}
            />
            <div
              className="customInputPasswordVisible"
              onClick={handlePassVisible}
            >
              {passVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </div>
          </>
        ) : (
          <input
            className={`${error && "customInputErrorTxt"}`}
            type={type}
            name={name}
            placeholder={placeHolder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete={autoComplete}
          />
        )}
      </div>
      {helperText.trim().length > 0 && (
        <p
          className={`customInputHelperText ${error && "customInputErrorTxt"}`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
