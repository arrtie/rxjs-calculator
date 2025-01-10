/** @format */

import CalculatorButton from "../../components/CalculatorButton";
import { clickNumber } from "./controller";

export default function OperandView() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <CalculatorButton onClick={() => clickNumber(`${index}`)}>
          {index}
        </CalculatorButton>
      ))}
    </div>
  );
}
