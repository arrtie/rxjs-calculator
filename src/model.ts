/** @format */

export const calculatorOperators = ["+", "-", "/", "*"];
export type CalculatorOperator = (typeof calculatorOperators)[number];
export interface CalculationState {
  firstOp: string;
  secondOp: string;
  operator: CalculatorOperator | "";
}
export type CalculationAction = (state: CalculationState) => CalculationState;
export type DisplayAction = (state: CalculationState) => string;
