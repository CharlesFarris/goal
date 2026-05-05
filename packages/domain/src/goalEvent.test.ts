import { describe, expect, test } from "bun:test";
import { initialState } from "./goal.ts";
import type { GoalAchieved, GoalSet } from "./goalEvent.ts";
import { evolve } from "./goalEvent.ts";

describe("evolve", () => {
  test("GoalSet on UnknownGoal returns SetGoal", () => {
    const state = initialState();
    const event: GoalSet = {
      type: "GoalSet",
      data: { id: "test-id" },
    };
    const result = evolve(state, event);
    expect(result.type).toEqual("SetGoal");
  });

  test("GoalAchieved on UnknownGoal returns unchanged state", () => {
    const state = initialState();
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "test-id" },
    };
    const result = evolve(state, event);
    expect(result).toBe(state);
  });

  test("GoalAchieved on SetGoal with matching id returns AchievedGoal", () => {
    const setGoal = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "goal-123" },
    };
    const result = evolve(setGoal, event);
    expect(result.type).toEqual("AchievedGoal");
    expect((result as { id: string }).id).toEqual("goal-123");
  });

  test("GoalAchieved on SetGoal with non-matching id returns unchanged state", () => {
    const setGoal = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "other-id" },
    };
    const result = evolve(setGoal, event);
    expect(result).toBe(setGoal);
  });

  test("GoalSet on SetGoal returns unchanged state", () => {
    const setGoal = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalSet = {
      type: "GoalSet",
      data: { id: "test-id" },
    };
    const result = evolve(setGoal, event);
    expect(result).toBe(setGoal);
  });

  test("any event on AchievedGoal returns unchanged state", () => {
    const achievedGoal = { type: "AchievedGoal" as const, id: "goal-123" };
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: "goal-123" },
    };
    const result = evolve(achievedGoal, event);
    expect(result).toBe(achievedGoal);
  });
});
