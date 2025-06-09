import SignInForm from "./sign-in/Signin-form.component";
import SignUpForm from "./sign-up/signup-form.component";
import classes from "./layout-auth.module.css";

export default function AuthContainer() {
  return (
    <div className={classes.container}>
      <SignInForm />
      <SignUpForm />
    </div>
  );
}
