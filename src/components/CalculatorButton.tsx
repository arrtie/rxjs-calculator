/** @format */

import { ReactNode } from "preact/compat";

interface CalculatorButton {
  children: ReactNode;
  onClick?: (e: Event) => void;
}

export default function CalculatorButton({
  children,
  onClick,
}: CalculatorButton) {
  return (
    <button onClick={onClick} css={{ padding: "8px" }}>
      {children}
    </button>
  );
}
