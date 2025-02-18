/** @format */

import { render, screen } from "@testing-library/preact";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { App } from "../app";

function getButton(name: string) {
  return screen.findByRole("button", { name });
}

function makeClickableButton(user: UserEvent) {
  return async function clickButton(name: string) {
    return user.click(await getButton(name));
  };
}

function renderApp() {
  const userController = userEvent.setup();
  const result = render(<App />);
  return {
    result,
    userController,
    clickButton: makeClickableButton(userController),
  };
}

describe("addition", () => {
  test.each([
    { operation: "0+0", total: "0" },
    { operation: "3+3", total: "6" },
    { operation: "3+6", total: "9" },
    { operation: "333+333", total: "666" },
  ])("$operation = $total", async ({ operation, total }) => {
    const { clickButton } = renderApp();
    const clicks = operation.split("").map((buttonName) => {
      return clickButton(buttonName);
    });
    await Promise.all(clicks);
    await clickButton("Total");
    expect(screen.getByTestId("display").textContent).toBe(`[${total}]`);
  });
});
