/** @format */

import { Subject } from "rxjs";
import { clickButton } from "../../calculation";
import { CalculationAction, CalculationState } from "../../model";

export const operandSubject = new Subject<CalculationAction>();

function decideOperand(state: CalculationState) {
  return state.operator === "" ? "firstOp" : "secondOp";
}

function concatOperand(acc: string, current: string) {
  if (acc === "") {
    return `${current}`;
  }
  return `${acc}${current}`;
}

function appendDigit(x: string) {
  return (state: CalculationState) => {
    const operandRef = decideOperand(state);
    state[operandRef] = concatOperand(state[operandRef], x);
    return state;
  };
}

export function clickNumber(x: string) {
  // operandSubject.next(appendDigit(x));
  clickButton(x);
}
