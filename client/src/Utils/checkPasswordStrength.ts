export function checkPasswordStrength(currentPassword: string) {
  const numberRegex = new RegExp("(?=.*[0-9])");
  const uppercaseRegex = new RegExp("(?=.*[A-Z])");
  const lowercaseRegex = new RegExp("(?=.*[a-z])");
  const specialcharacterRegex = new RegExp("(?=.*[$&+,:;=?@#|'<>.^*()%!-/])");
  const lengthRegex = new RegExp("(?=\\S+$).{8,20}");
  const isNumberIncluded = numberRegex.test(currentPassword);
  const isUppercaseIncluded = uppercaseRegex.test(currentPassword);
  const isLowercaseIncluded = lowercaseRegex.test(currentPassword);
  const isSpecialcharacterIncluded =
    specialcharacterRegex.test(currentPassword);
  const isLengthValid = lengthRegex.test(currentPassword);

  const isPasswordValid =
    isNumberIncluded &&
    isUppercaseIncluded &&
    isLowercaseIncluded &&
    isSpecialcharacterIncluded &&
    isLengthValid;

  return {
    isPasswordValid,
    isNumberIncluded,
    isUppercaseIncluded,
    isLowercaseIncluded,
    isSpecialcharacterIncluded,
    isLengthValid,
  };
}
