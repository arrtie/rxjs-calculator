/** @format */

import { Subject } from "rxjs";
import { clickButton } from "../../calculation";
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
  // operatorSubject.next(selectOperator(operator));
  clickButton(operator);
}

function selectOperator(operator: CalculatorOperator) {
  return (state: CalculationState) => ({ ...state, operator });
}

export { hasOperatorObservable as disableOperatorsObservable } from "../../calculation/index";
