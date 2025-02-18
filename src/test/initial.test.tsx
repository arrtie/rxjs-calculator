/** @format */

import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";
import "global-jsdom";
import "jsdom";
import { describe, expect, test } from "vitest";
import { App } from "../app";

function renderApp() {
  const userController = userEvent.setup();
  const result = render(<App />);
  return { result, userController };
}

describe("addition", () => {
  test("3 + 3", async () => {
    const testTools = renderApp();
    const threeButton = await screen.findByRole("button", { name: "3" });
    const sumButton = await screen.findByRole("button", { name: "+" });
    const totalButton = await screen.findByRole("button", { name: "Total" });
    await testTools.userController.click(threeButton);
    await testTools.userController.click(sumButton);
    await testTools.userController.click(threeButton);
    await testTools.userController.click(totalButton);
    expect(screen.getByTestId("display").textContent).toBe("[6]");
  });
});
