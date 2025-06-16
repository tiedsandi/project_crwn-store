import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@/components/UI/button/button.component";
import Input from "@/components/UI/input/Input.component";
import { selectCurrentUser } from "../../auth.selector";
import { signUp } from "@/features/auth/authSlice";
import styles from "./signup-form.module.css";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (currentUser) {
      const isAdmin = currentUser.email.includes("admin");
      navigate(isAdmin ? "/admin" : "/shop");
    }
  }, [currentUser, navigate]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setFormErrors({});
  };

  const validateForm = ({ displayName, email, password, confirmPassword }) => {
    const errors = {};

    if (!displayName.trim()) errors.displayName = "Display name is required";

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = "Invalid email format";
    }

    if (password.length < 7)
      errors.password = "Password must be at least 7 characters";

    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm(formFields);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await dispatch(signUp({ email, password, displayName })).unwrap();
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setFormErrors({ email: "Email is already in use" });
      } else {
        setFormErrors({ general: "Something went wrong. Please try again." });
      }
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormFields((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name] || formErrors.general) {
      setFormErrors((prev) => ({ ...prev, [name]: null, general: null }));
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Display Name"
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          id="signup-display-name"
          error={formErrors.displayName}
          required
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          id="signup-email"
          error={formErrors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          id="signup-password"
          error={formErrors.password}
          required
        />
        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          id="signup-confirm-password"
          error={formErrors.confirmPassword}
          required
        />

        {formErrors.general && (
          <div className={styles.formError}>{formErrors.general}</div>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
