import classes from "./spinner.module.css";

const Spinner = () => (
  <div className={classes.overlay}>
    <div className={classes.container}></div>
  </div>
);

export default Spinner;
