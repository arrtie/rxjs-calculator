/** @format */

import "./app.css";
import DisplayView from "./features/display/view";
import OperandView from "./features/operand/view";
import OperatorButtons from "./features/operator/view";
import ResolveButtons from "./features/resolve/view";

export function App() {
  return (
    <main
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>RXJS Calculator</h1>
      <DisplayView />
      <OperandView />
      <OperatorButtons />
      <ResolveButtons />
    </main>
  );
}
