import "./index.js";

const MultiSelect = (props) => {
  const {
    label = "Label",
    name = "",
    iconLeft,
    value,
    onChange,
    onFocus,
    onBlur,
    helperText = "",
    error = false,
    children,
  } = props;

  return (
    <div className="customSelectWrapper">
      <label
        className={`customSelectLabel ${error && "customSelectErrorTxt"}`}
        htmlFor={name}
      >
        {label}
      </label>

      <div
        className={`customSelectInner ${error && "customSelectErrorBorder"}`}
      >
        {iconLeft}
        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          <option value=""></option>
          {children}
        </select>
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

export default MultiSelect;
