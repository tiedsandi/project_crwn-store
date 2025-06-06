import classes from "./button.module.css";
import spinnerClasses from "../spinner/spinner.module.css";

const BUTTON_TYPE_CLASSES = {
  base: "baseButton",
  google: "googleSignIn",
  inverted: "inverted",
};

const Button = ({
  children,
  buttonType = "base",
  isLoading,
  ...otherProps
}) => {
  const buttonClass = classes[BUTTON_TYPE_CLASSES[buttonType]];

  return (
    <button
      className={`${classes.baseButton} ${buttonClass}`}
      disabled={isLoading}
      {...otherProps}
    >
      {isLoading ? <div className={spinnerClasses.spinner} /> : children}
    </button>
  );
};

export default Button;
