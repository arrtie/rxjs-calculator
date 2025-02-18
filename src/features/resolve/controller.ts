/** @format */
import { clickButton } from "../../calculation/index";

const clickClear = () => {
  clickButton("C");
};

const clickTotal = () => {
  clickButton("=");
};

export { hasSecondOperandObservable as readyToTotal } from "../../calculation/index";
export { clickClear, clickTotal };
