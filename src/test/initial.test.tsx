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

async function clickCalculatorButtons({
  operation,
  total,
}: {
  operation: string;
  total: string;
}) {
  const { clickButton } = renderApp();
  const clicks = operation.split("").map((buttonName) => {
    return clickButton(buttonName);
  });
  await Promise.all(clicks);
  expect(screen.getByTestId("display").textContent).toBe(`[${total}]`);
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
  describe("happy path", () => {
    test.each([
      { operation: "0+0=", total: "0" },
      { operation: "3+3=", total: "6" },
      { operation: "3+6=", total: "9" },
      { operation: "333+333=", total: "666" },
    ])("$operation = $total", clickCalculatorButtons);
  });
});

describe("subtraction", () => {
  describe("happy path", () => {
    test.each([
      { operation: "0-0=", total: "0" },
      { operation: "3-187=", total: "-184" },
      { operation: "13-3=", total: "10" },
      { operation: "45-45=", total: "0" },
    ])("$operation = $total", clickCalculatorButtons);
  });
});

describe("division", () => {
  describe("happy path", () => {
    test.each([
      { operation: "0/1=", total: "0" },
      { operation: "3/9=", total: "0.3333333333333333" },
      { operation: "16420/4=", total: "4105" },
      { operation: "45/45=", total: "1" },
    ])("$operation = $total", clickCalculatorButtons);
  });

  describe("unhappy path", () => {
    test.each([
      { operation: "0/=", total: "undefined" },
      { operation: "1/=", total: "undefined" },
      { operation: "0/0=", total: "undefined" },
      { operation: "1/9765432168791624=", total: "1.0240202202169822e-16" },
    ])("$operation = $total", clickCalculatorButtons);
  });
});

describe("multiplication", () => {
  describe("happy path", () => {
    test.each([
      { operation: "0*1=", total: "0" },
      { operation: "3*9=", total: "27" },
      { operation: "16420*4=", total: "65680" },
      { operation: "45*45=", total: "2025" },
    ])("$operation = $total", clickCalculatorButtons);
  });

  describe("unhappy path", () => {
    test.each([
      { operation: "0*=", total: "0" },
      { operation: "1*=", total: "0" },
      {
        operation: "164201642016420*164201642016420=",
        total: "2.6962179240888545e+28",
      },
    ])("$operation = $total", clickCalculatorButtons);
  });
});
