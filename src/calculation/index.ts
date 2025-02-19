/** @format */

import { BehaviorSubject, map, scan, share } from "rxjs";
import { CalculatorOperator, calculatorOperators } from "../model";
import nullCheck from "../utils/nullCheck";
import { operate } from "./operator";

const inputBehavior = new BehaviorSubject("");

export function clickButton(buttonValue: string) {
  inputBehavior.next(buttonValue);
}

interface CalculationObject {
  display: string;
  operator: CalculatorOperator | null;
  done: boolean;
}

function appendToCalcObject(latestChar: string) {
  return function (calcObj: CalculationObject) {
    calcObj.display = `${calcObj.display}${latestChar}`;
    return calcObj;
  };
}

export const ongoingCalculationObservable = inputBehavior.pipe(
  map((latestChar) => {
    if (calculatorOperators.includes(latestChar)) {
      return function (calcObj: CalculationObject) {
        calcObj.operator = latestChar;
        return appendToCalcObject(latestChar)(calcObj);
      };
    }
    if (latestChar === "C") {
      return () => ({ display: "", operator: null, done: false });
    }
    if (latestChar === "=") {
      return (calcObj: CalculationObject) => {
        return {
          display: calculateFromObject(calcObj),
          operator: null,
          done: true,
        };
      };
    }
    return appendToCalcObject(latestChar);
  }),
  scan<(v: CalculationObject) => CalculationObject, CalculationObject>(
    (acc, current) => current(acc),
    { display: "", operator: null, done: false }
  ),
  share()
);

function calculateFromObject(calcObj: CalculationObject) {
  const operator = nullCheck(calcObj.operator);
  const [op1, op2] = calcObj.display.split(operator);
  const x = parseInt(op1);
  const y = parseInt(op2) || 0;
  return `${operate(x, operator, y)}`;
}

export const displayObservable = ongoingCalculationObservable.pipe(
  map((calcObj) => calcObj.display)
);

export const hasOperatorObservable = ongoingCalculationObservable.pipe(
  map((calcObj) => calcObj.operator != null)
);
