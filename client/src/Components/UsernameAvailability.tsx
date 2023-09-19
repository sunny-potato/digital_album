export function UsernameAvailability({
  isUsernameValid,
  usernameLength,
  style,
}: {
  usernameLength: number;
  isUsernameValid: boolean;
  style: CSSModuleClasses;
}) {
  if (usernameLength === 0) {
    return <span>{""}</span>;
  }
  if (usernameLength < 5 || usernameLength >= 15) {
    return (
      <span className={style.warningNote}>must be 5 to 15 characters </span>
    );
  }
  if (usernameLength !== 0 && isUsernameValid) {
    return <span className={style.successNote}> valid username</span>;
  }
  if (usernameLength !== 0 && !isUsernameValid) {
    return <span className={style.warningNote}> invalid username</span>;
  }
  return <span></span>;
}
