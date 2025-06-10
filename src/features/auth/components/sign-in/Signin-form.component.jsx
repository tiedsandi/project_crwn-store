import { useDispatch, useSelector } from "react-redux";

import Button from "@/components/UI/button/button.component";
import Input from "@/components/UI/input/Input.component";
import { signIn } from "@/features/auth/authSlice";
import styles from "./Signin-form.module.css";
import { useState } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(signIn({ email, password }));
    resetFormFields();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className={styles.signInContainer}>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className={styles.formError}>Sign-in failed: {error}</div>
        )}
        <Input
          label="Email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          id="sign-in-email"
        />
        <Input
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
          id="sign-in-password"
        />
        <div className={styles.buttonsContainer}>
          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Button buttonType="google" type="button" onClick={() => {}}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
}
