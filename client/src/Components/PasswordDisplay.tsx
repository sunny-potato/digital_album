export function PasswordDisplay({
  checkStatus,
  value,
}: {
  checkStatus: boolean;
  value: string;
}) {
  return <span style={{ color: checkStatus ? "green" : "red" }}> {value}</span>;
}
