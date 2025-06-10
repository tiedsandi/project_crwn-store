import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/UI/button/button.component";
import Input from "@/components/UI/input/Input.component";
import { signUp } from "@/features/auth/authSlice";
import styles from "./signup-form.module.css";
import { useState } from "react";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formErrors, setFormErrors] = useState({});
  const { displayName, email, password, confirmPassword } = formFields;

  const dispatch = useDispatch();
  const { error: globalError, loading } = useSelector((state) => state.auth);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setFormErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (password.length < 7) {
      errors.password = "Password must be at least 7 characters";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!displayName.trim()) {
      errors.displayName = "Display name is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    dispatch(signUp({ email, password, displayName }))
      .unwrap()
      .then(() => resetFormFields())
      .catch((errorCode) => {
        if (errorCode === "auth/email-already-in-use") {
          setFormErrors({ email: "Email is already in use" });
        } else {
          console.error("Sign-up error:", errorCode);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <Input
          label="Display Name"
          type="text"
          required
          name="displayName"
          value={displayName}
          onChange={handleChange}
          id="signup-display-name"
          error={formErrors.displayName}
        />
        <Input
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          id="signup-email"
          error={formErrors.email}
        />
        <Input
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          id="signup-password"
          error={formErrors.password}
        />
        <Input
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          id="signup-confirm-password"
          error={formErrors.confirmPassword}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
        {globalError && !formErrors.email && (
          <div className={styles.formError}>
            Error: {globalError.replace("auth/", "").replaceAll("-", " ")}
          </div>
        )}
      </form>
    </div>
  );
}
