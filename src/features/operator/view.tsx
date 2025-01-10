/** @format */

import CalculatorButton from "../../components/CalculatorButton";
import { calculatorOperators } from "../../model";
import { clickOperator } from "./controller";

export default function OperatorButtons() {
  return (
    <div>
      {calculatorOperators.map((operator) => (
        <CalculatorButton onClick={() => clickOperator(operator)}>
          {operator}
        </CalculatorButton>
      ))}
    </div>
  );
}
