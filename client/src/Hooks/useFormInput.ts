import { useState } from "react";

export function useFormInput(initialValue: any) {
  const [value, setValue] = useState(initialValue);

  function inputHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
  }
  const inputProps = {
    value: value,
    onChange: inputHandler,
  };
  console.log(inputProps);

  return inputProps;
}
