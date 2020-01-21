import * as React from "react";
import * as ReactDOM from "react-dom";

import "../style/style.scss";

export interface HelloProps {
  compiler: string;
  framework: string;
}

function exceptional() {
  console.log("Running...");
  throw "ERROR";
}

export const Hello = (props: HelloProps) => (
  <>
    <h1>
      Hello from {props.compiler} and {props.framework}!
    </h1>
    <button onClick={exceptional}>THROW</button>
  </>
);

ReactDOM.render(
  <Hello compiler="TypeScript" framework="React" />,
  document.getElementById("root")
);
