/** @format */

import CalculatorButton from "../../components/CalculatorButton";
import { calculatorOperators } from "../../model";
import { useObservable } from "../../utils/useObservable";
import { clickOperator, disableOperatorsObservable } from "./controller";

export default function OperatorButtons() {
  const disableOperators = useObservable(disableOperatorsObservable);

  return (
    <div>
      {calculatorOperators.map((operator) => (
        <CalculatorButton
          key={operator}
          disabled={disableOperators}
          onClick={() => clickOperator(operator)}
        >
          {operator}
        </CalculatorButton>
      ))}
    </div>
  );
}
