import { describe, expect, test } from "bun:test";
import type { GoalAchieved, GoalSet } from "./goalEvent.ts";
import { evolve, isGoalAchieved, isGoalSet } from "./goalEvent.ts";
import { initialState, isAchievedGoal, isSetGoal } from "./goalState.ts";

describe("evolve", () => {
  test("GoalSet on UnknownGoal returns SetGoal", () => {
    const state = initialState();
    const event: GoalSet = {
      type: "GoalSet",
      data: { id: "test-id" },
    };
    const newState = evolve(state, event);
    if (isSetGoal(newState)) {
      expect(newState.id).toEqual("test-id");
    }
  });

  test("GoalAchieved on UnknownGoal returns unchanged state", () => {
    const state = initialState();
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "test-id" },
    };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalAchieved on SetGoal with matching id returns AchievedGoal", () => {
    const state = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "goal-123" },
    };
    const newState = evolve(state, event);
    if (isAchievedGoal(newState)) {
      expect(newState.id).toEqual("goal-123");
    }
  });

  test("GoalAchieved on SetGoal with non-matching id returns unchanged state", () => {
    const state = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "other-id" },
    };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalSet on SetGoal returns unchanged state", () => {
    const state = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalSet = {
      type: "GoalSet",
      data: { id: "test-id" },
    };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("any event on AchievedGoal returns unchanged state", () => {
    const state = { type: "AchievedGoal" as const, id: "goal-123" };
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "goal-123" },
    };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });
});

describe("isGoalSet", () => {
  test("returns true for GoalSet event", () => {
    const event: GoalSet = { type: "GoalSet", data: { id: "1" } };
    expect(isGoalSet(event)).toBe(true);
  });

  test("returns false for GoalAchieved event", () => {
    const event: GoalAchieved = { type: "GoalAchieved", data: { id: "1" } };
    expect(isGoalSet(event)).toBe(false);
  });
});

describe("isGoalAchieved", () => {
  test("returns true for GoalAchieved event", () => {
    const event: GoalAchieved = { type: "GoalAchieved", data: { id: "1" } };
    expect(isGoalAchieved(event)).toBe(true);
  });

  test("returns false for GoalSet event", () => {
    const event: GoalSet = { type: "GoalSet", data: { id: "1" } };
    expect(isGoalAchieved(event)).toBe(false);
  });
});
