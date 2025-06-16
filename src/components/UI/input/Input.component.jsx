import { useEffect, useMemo, useRef, useState } from "react";

import classes from "./input.module.css";

export default function Input({
  label,
  id,
  name,
  value,
  defaultValue,
  onChange,
  error,
  ...props
}) {
  const inputRef = useRef(null);
  const [shrink, setShrink] = useState(false);

  // Tentukan apakah input controlled (value !== undefined)
  const isControlled = useMemo(() => value !== undefined, [value]);

  useEffect(() => {
    if (isControlled) {
      setShrink(value?.toString().length > 0);
    } else if (inputRef.current) {
      setShrink(inputRef.current.value.length > 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleChange = (e) => {
    if (onChange) onChange(e);

    if (!isControlled && inputRef.current) {
      setShrink(e.target.value.length > 0);
    }
  };

  return (
    <div className={classes.group}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        className={classes.input}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={handleChange}
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
