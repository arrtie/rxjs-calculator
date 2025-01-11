/** @format */

import { PropsOf } from "@emotion/react";
import { ReactNode } from "preact/compat";

interface CalculatorButton {
  children: ReactNode;
  onClick?: (e: Event) => void;
}

export default function CalculatorButton({
  children,
  ...props
}: PropsOf<HTMLButtonElement>) {
  return (
    <button {...props} css={{ padding: "8px" }}>
      {children}
    </button>
  );
}
