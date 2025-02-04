/** @format */

import { Subject } from "rxjs";
import { CalculationAction, CalculationState } from "../../model";

export const calculatorOperators = ["+", "-", "/", "*"];
export type CalculatorOperator = (typeof calculatorOperators)[number];

export const operatorSubject = new Subject<CalculationAction>();

export function operate(x: number, op: CalculatorOperator, y: number) {
  switch (op) {
    case "*": {
      return x * y;
    }
    case "/": {
      return x / y;
    }
    case "+": {
      return x + y;
    }
    case "-": {
      return x - y;
    }
    default:
      throw new Error(`the "${op}" operator doesn't exist`);
  }
}

export function clickOperator(operator: CalculatorOperator) {
  operatorSubject.next(selectOperator(operator));
}

function selectOperator(operator: CalculatorOperator) {
  return (state: CalculationState) => ({ ...state, operator });
}
