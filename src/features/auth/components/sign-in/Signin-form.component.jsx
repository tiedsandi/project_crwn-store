import { googleSignIn, signIn } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Button from "@/components/UI/button/button.component";
import Input from "@/components/UI/input/Input.component";
import { selectCurrentUser } from "../../auth.selector";
import styles from "./Signin-form.module.css";
import { useNavigate } from "react-router";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formError, setFormError] = useState(null);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const currentUser = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const isAdmin = currentUser.email.includes("admin");
      navigate(isAdmin ? "/admin" : "/shop");
    }
  }, [currentUser, navigate]);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleGoogleLogin = async () => {
    dispatch(googleSignIn());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(null); // reset error saat submit ulang

    try {
      await dispatch(signIn({ email, password })).unwrap();
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setFormError("Invalid email or password");
      } else {
        setFormError("Sign-in failed. Please try again.");
      }
    }
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
        {formError && <div className={styles.formError}>{formError}</div>}

        <Input
          label="Email (ex:admin@gmail.com)"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChange}
          id="sign-in-email"
        />
        <Input
          label="Password  (ex:12345678)"
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

          <Button buttonType="google" type="button" onClick={handleGoogleLogin}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
}
