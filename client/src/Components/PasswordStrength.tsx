import { PasswordDisplay } from "../Components/PasswordDisplay";

export function PasswordStrength({
  isNumberIncluded,
  isLowercaseIncluded,
  isUppercaseIncluded,
  isSpecialcharacterIncluded,
  isLengthValid,
  style,
}: {
  isNumberIncluded: boolean;
  isLowercaseIncluded: boolean;
  isUppercaseIncluded: boolean;
  isSpecialcharacterIncluded: boolean;
  isLengthValid: boolean;
  style: CSSModuleClasses;
}) {
  return (
    <span className={style.passwordCheckList}>
      <PasswordDisplay checkStatus={isNumberIncluded} value={"Number,"} />
      <PasswordDisplay checkStatus={isLowercaseIncluded} value={"Lowercase,"} />
      <PasswordDisplay checkStatus={isUppercaseIncluded} value={"Uppercase,"} />
      <PasswordDisplay
        checkStatus={isSpecialcharacterIncluded}
        value={"Symbol,"}
      />
      <PasswordDisplay checkStatus={isLengthValid} value={"Length(8-20)"} />
    </span>
  );
}
