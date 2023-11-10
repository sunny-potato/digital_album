import { useParams } from "react-router-dom";

function MyPage() {
  const userId = Number(useParams().userId);

  return (
    <div style={{ padding: "100px" }}> {`my page & userId: ${userId}`}</div>
  );
}

export default MyPage;
