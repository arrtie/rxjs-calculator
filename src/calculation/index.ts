/** @format */

import { BehaviorSubject, map, scan, share } from "rxjs";
import { CalculationObject, calculatorOperators } from "../model";
import nullCheck from "../utils/nullCheck";
import { operate } from "./operator";

const inputBehavior = new BehaviorSubject("");

export function clickButton(buttonValue: string) {
  inputBehavior.next(buttonValue);
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
      return () => ({ display: "", operator: null });
    }
    if (latestChar === "=") {
      return (calcObj: CalculationObject) => {
        return {
          display: calculateFromObject(calcObj),
          operator: null,
        };
      };
    }
    return appendToCalcObject(latestChar);
  }),
  scan<(v: CalculationObject) => CalculationObject, CalculationObject>(
    (acc, current) => current(acc),
    { display: "", operator: null }
  ),
  share()
);

function parseUserInput(calcObj: CalculationObject) {
  const operator = nullCheck(calcObj.operator);
  const [op1, op2] = calcObj.display.split(operator);
  const x = parseInt(op1);
  const y = parseInt(op2) || 0;
  const override = (() => {
    if (!y && operator === "/") {
      return "undefined";
    }
    return null;
  })();
  return { x, y, operator, override };
}

function calculateFromObject(calcObj: CalculationObject) {
  const { x, y, operator, override } = parseUserInput(calcObj);
  return override != null ? override : `${operate(x, operator, y)}`;
}

export const displayObservable = ongoingCalculationObservable.pipe(
  map((calcObj) => calcObj.display)
);

export const hasOperatorObservable = ongoingCalculationObservable.pipe(
  map((calcObj) => calcObj.operator != null)
);
