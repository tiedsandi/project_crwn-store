import { useEffect, useRef, useState } from "react";

import classes from "./input.module.css";

export default function Input({
  label,
  id,
  error,
  value,
  defaultValue,
  ...props
}) {
  const inputRef = useRef(null);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const input = inputRef.current;
    const hasValue = input?.value?.length > 0;
    setShrink(hasValue);

    const handleInput = () => setShrink(input.value.length > 0);
    input?.addEventListener("input", handleInput);

    return () => {
      input?.removeEventListener("input", handleInput);
    };
  }, []);

  return (
    <div className={classes.group}>
      <input
        ref={inputRef}
        id={id}
        className={classes.input}
        {...(value !== undefined ? { value } : {})}
        {...(defaultValue !== undefined ? { defaultValue } : {})}
        {...props}
      />
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
