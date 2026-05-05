import { describe, expect, test } from "bun:test";
import { initialState } from "./goal";

describe("initialState", () => {
  test("returns GoalUnknown", () => {
    const goal = initialState();
    expect(goal.type).toEqual("UnknownGoal");
  });
});
