import { useEffect, useState } from "react";

import classes from "./input.module.css";

export default function Input({ label, id, error, value = "", ...props }) {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    setShrink(Boolean(value && value.length));
  }, [value]);

  return (
    <div className={classes.group}>
      <input id={id} className={classes.input} value={value} {...props} />
      {label && (
        <label
          htmlFor={id}
          className={`${classes.formInputLabel} ${
            shrink ? classes.shrink : ""
          }`}
        >
          {label}
        </label>
      )}
      {error && <p className={classes.error}>{error}</p>}
    </div>
  );
}
