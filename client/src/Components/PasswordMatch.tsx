export function PasswordMatch({
  passwordLength,
  isPasswordsMatched,
  style,
}: {
  passwordLength: number;
  isPasswordsMatched: boolean;
  style: CSSModuleClasses;
}) {
  if (passwordLength === 0) {
    return <span></span>;
  }
  if (passwordLength !== 0 && isPasswordsMatched) {
    return <span className={style.successNote}>passwords are matching</span>;
  }
  if (passwordLength !== 0 && !isPasswordsMatched) {
    return (
      <span className={style.warningNote}>passwords are not matching</span>
    );
  }
}
