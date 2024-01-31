export function PasswordMatch({
  passwordLength,
  isPasswordsMatched,
}: {
  passwordLength: number;
  isPasswordsMatched: boolean;
}) {
  if (passwordLength === 0) {
    return <span></span>;
  }
  if (passwordLength !== 0 && isPasswordsMatched) {
    return <span style={{ color: "green" }}>Passwords are matching</span>;
  }
  if (passwordLength !== 0 && !isPasswordsMatched) {
    return <span style={{ color: "red" }}>Passwords are not matching</span>;
  }
}
