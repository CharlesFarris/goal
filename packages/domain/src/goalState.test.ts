import { describe, expect, test } from "bun:test";
import {
  initialState,
  isAbandonedGoal,
  isAchievedGoal,
  isSetGoal,
  isUnknownGoal,
} from "./index.ts";

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

  test("returns false for AbandonedGoal", () => {
    expect(isUnknownGoal({ type: "AbandonedGoal", id: "1" })).toBe(false);
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

  test("returns false for AbandonedGoal", () => {
    expect(isSetGoal({ type: "AbandonedGoal", id: "1" })).toBe(false);
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

  test("returns false for AbandonedGoal", () => {
    expect(isAchievedGoal({ type: "AbandonedGoal", id: "1" })).toBe(false);
  });
});

describe("isAbandonedGoal", () => {
  test("returns true for AbandonedGoal", () => {
    expect(isAbandonedGoal({ type: "AbandonedGoal", id: "1" })).toBe(true);
  });

  test("returns false for UnknownGoal", () => {
    expect(isAbandonedGoal({ type: "UnknownGoal" })).toBe(false);
  });

  test("returns false for SetGoal", () => {
    expect(isAbandonedGoal({ type: "SetGoal", id: "1" })).toBe(false);
  });

  test("returns false for AchievedGoal", () => {
    expect(isAbandonedGoal({ type: "AchievedGoal", id: "1" })).toBe(false);
  });
});
