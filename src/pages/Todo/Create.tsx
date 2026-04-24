import { useRef } from "react";
import { Form, useNavigate } from "react-router";

export default function Create() {
  return (
    <>
      <Form method="post">
        <input type="text" name="todo" placeholder="Enter Todo" />
        <input type="checkbox" value={"true"} name="completed" />
        <input type="submit" />
      </Form>
    </>
  );
}
