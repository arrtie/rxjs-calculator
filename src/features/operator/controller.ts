/** @format */

import { clickButton } from "../../calculation";
import { CalculatorOperator } from "../../model";

export function clickOperator(operator: CalculatorOperator) {
  clickButton(operator);
}

export { hasOperatorObservable as disableOperatorsObservable } from "../../calculation/index";
