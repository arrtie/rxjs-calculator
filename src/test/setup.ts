/** @format */

import { cleanup } from "@testing-library/preact";
import { clickClear } from "../features/resolve/controller";

// Automatically clean up DOM after each test
afterEach(() => {
  clickClear();
  cleanup();
});
