/** @format */

import { useObservable } from "../../utils/useObservable";
import { displayObservable } from "./controller";

export default function DisplayView() {
  const display = useObservable(displayObservable);
  return <pre>[{display}]</pre>;
}
