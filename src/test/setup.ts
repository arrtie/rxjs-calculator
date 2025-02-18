/** @format */

import { cleanup } from "@testing-library/preact";
import { clickClear } from "../calculation";

// Automatically clean up DOM after each test
afterEach(() => {
  clickClear();
  cleanup();
});
