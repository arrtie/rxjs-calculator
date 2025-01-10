/** @format */

import CalculatorButton from "../../components/CalculatorButton";
import { clickClear, clickTotal } from "./controller";

export default function ResolveButtons() {
  return (
    <div>
      <CalculatorButton onClick={clickTotal}>Total</CalculatorButton>
      <CalculatorButton onClick={clickClear}>Clear</CalculatorButton>
    </div>
  );
}
