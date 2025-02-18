/** @format */

import { BehaviorSubject, map, merge, scan, share } from "rxjs";
import { operandSubject } from "../features/operand/controller";
import { operate, operatorSubject } from "../features/operator/controller";
import { CalculationState, calculatorOperators } from "../model";

export const calculationObservable = merge(
  operandSubject,
  operatorSubject
).pipe(
  scan(
    (
      state: CalculationState,
      action: (state: CalculationState) => CalculationState
    ) => {
      return action(state);
    },
    { firstOp: "", secondOp: "", operator: "" }
  ),
  share()
);

export const updateCalculation = (opState: CalculationState) => {
  if (opState.firstOp === "") {
    return "0";
  }
  return `${opState.firstOp} ${opState.operator} ${opState.secondOp}`;
};

export const calculate = (state: CalculationState) => {
  const x = parseInt(state.firstOp);
  const y = parseInt(state.secondOp);
  return `${operate(x, state.operator, y)}`;
};

type DisplayAction = (state: CalculationState) => string;

function makeBaseCalculationState() {
  return { firstOp: "", secondOp: "", operator: "" };
}

function clearCalculation() {
  return makeBaseCalculationState();
}

export function clickTotal() {
  displayActionBehavior.next(calculate);
}

export function clickClear() {
  displayActionBehavior.next(updateCalculation);
  operatorSubject.next(clearCalculation);
}

export const displayActionBehavior = new BehaviorSubject<DisplayAction>(
  updateCalculation
);

// export const displayObservable = combineLatest([
//   calculationObservable,
//   displayActionBehavior,
// ]).pipe(map(([state, displayAction]) => displayAction(state)));

export const hasSecondOperandObservable = calculationObservable.pipe(
  map((state) => state.secondOp !== "")
);

const inputBehavior = new BehaviorSubject("");

export function clickButton(buttonValue: string) {
  inputBehavior.next(buttonValue);
}

export const ongoingCalculationObservable = inputBehavior.pipe(
  scan(
    (acc, current) => {
      if (calculatorOperators.includes(current)) {
        acc.operand = current;
      }
      acc.display = `${acc.display}${current}`;
      return acc;
    },
    { display: "", operand: "" }
  ),
  share()
);

export const displayObservable = ongoingCalculationObservable.pipe(
  map((calcObj) => calcObj.display)
);
export const hasOperatorObservable = ongoingCalculationObservable.pipe(
  map((calcObj) => calcObj.operand != "")
);
