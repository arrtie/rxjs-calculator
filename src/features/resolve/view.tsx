/** @format */

import CalculatorButton from "../../components/CalculatorButton";
import { useObservable } from "../../utils/useObservable";
import { clickClear, clickTotal, readyToTotal } from "./controller";

export default function ResolveButtons() {
  const totalReady = useObservable(readyToTotal);

  return (
    <div>
      <CalculatorButton disabled={!totalReady} onClick={clickTotal}>
        Total
      </CalculatorButton>
      <CalculatorButton onClick={clickClear}>Clear</CalculatorButton>
    </div>
  );
}
