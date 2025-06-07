import Button from "../../UI/button/button.component";
import Input from "../../UI/input/Input.component";
import styles from "./Signin-form.module.css";
import { useState } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = () => {
    // dispatch(googleSignInStart());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch(emailSignInStart(email, password));
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
          <Button type="submit">Sign In</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
}
