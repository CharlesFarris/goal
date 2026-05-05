import { describe, expect, test } from "bun:test";
import {
  initialState,
  isAchievedGoal,
  isSetGoal,
  isUnknownGoal,
} from "./goalState";

describe("initialState", () => {
  test("returns UnknownGoal", () => {
    const goal = initialState();
    expect(goal.type).toEqual("UnknownGoal");
  });
});

describe("isUnknownGoal", () => {
  test("returns true for UnknownGoal", () => {
    expect(isUnknownGoal({ type: "UnknownGoal" })).toBe(true);
  });

  test("returns false for SetGoal", () => {
    expect(isUnknownGoal({ type: "SetGoal", id: "1" })).toBe(false);
  });

  test("returns false for AchievedGoal", () => {
    expect(isUnknownGoal({ type: "AchievedGoal", id: "1" })).toBe(false);
  });
});

describe("isSetGoal", () => {
  test("returns true for SetGoal", () => {
    expect(isSetGoal({ type: "SetGoal", id: "1" })).toBe(true);
  });

  test("returns false for UnknownGoal", () => {
    expect(isSetGoal({ type: "UnknownGoal" })).toBe(false);
  });

  test("returns false for AchievedGoal", () => {
    expect(isSetGoal({ type: "AchievedGoal", id: "1" })).toBe(false);
  });
});

describe("isAchievedGoal", () => {
  test("returns true for AchievedGoal", () => {
    expect(isAchievedGoal({ type: "AchievedGoal", id: "1" })).toBe(true);
  });

  test("returns false for UnknownGoal", () => {
    expect(isAchievedGoal({ type: "UnknownGoal" })).toBe(false);
  });

  test("returns false for SetGoal", () => {
    expect(isAchievedGoal({ type: "SetGoal", id: "1" })).toBe(false);
  });
});
