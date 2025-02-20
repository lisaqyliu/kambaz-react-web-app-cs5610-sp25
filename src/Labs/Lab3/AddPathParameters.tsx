import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function AddPathParameters() {
  const { a, b } = useParams();

  useEffect(() => {
    console.log("Params:", a, b);
  }, [a, b]);

  const numA = a ? parseInt(a, 10) : 0;
  const numB = b ? parseInt(b, 10) : 0;

  return (
    <div id="wd-add">
      <h4>Add Path Parameters</h4>
      {numA} + {numB} = {numA + numB}
    </div>
  );
}
