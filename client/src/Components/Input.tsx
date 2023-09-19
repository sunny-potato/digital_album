import { ReactNode } from "react";

export function Input({
  label,
  type,
  name,
  required,
  value,
  onChange,
  style,
  valueAvailability,
}: {
  label: string;
  type: string;
  name: string;
  required: boolean;
  value: string;
  onChange: (value: string) => void;
  style: CSSModuleClasses;
  valueAvailability?: ReactNode;
}) {
  return (
    <div className={style.signupInput}>
      <label>
        <div>
          {label}
          {valueAvailability}
        </div>
        <input
          type={type}
          name={name}
          required={required}
          value={value}
          onChange={(event) => onChange(event.currentTarget.value)}
        />
      </label>
    </div>
  );
}
