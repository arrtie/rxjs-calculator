/** @format */

import { CalculatorOperator } from "../model";

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
