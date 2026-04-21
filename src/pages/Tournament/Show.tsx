import { useParams } from "react-router";

export default function Show() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <h1>Tournament Show Page</h1>
    </>
  );
}
