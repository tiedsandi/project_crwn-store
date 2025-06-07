import Button from "../../UI/button/button.component";
import Input from "../../UI/input/Input.component";
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

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setFormErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = {};

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setFormErrors({ email: "Email is already in use" });
      } else {
        console.log("User creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });

    // Clear error when user starts typing again
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}
