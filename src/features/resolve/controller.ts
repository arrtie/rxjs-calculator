/** @format */
import { clickButton } from "../../calculation/index";

const clickClear = () => {
  clickButton("C");
};

const clickTotal = () => {
  clickButton("=");
};

export { hasOperatorObservable as readyToTotal } from "../../calculation/index";
export { clickClear, clickTotal };
