import { describe, expect, test } from "bun:test";
import type {
  GoalAbandoned,
  GoalAchieved,
  GoalResumed,
  GoalSet,
} from "./index.ts";
import {
  evolve,
  initialState,
  isAbandonedGoal,
  isAchievedGoal,
  isGoalAbandoned,
  isGoalAchieved,
  isGoalResumed,
  isGoalSet,
  isSetGoal,
} from "./index.ts";

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
    } else {
      expect(true).toBeFalse();
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

  test("GoalResumed on UnknownGoal returns unchanged state", () => {
    const state = initialState();
    const event: GoalResumed = { type: "GoalResumed", data: { id: "test-id" } };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalAchieved on SetGoal with matching id returns AchievedGoal", () => {
    const state = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalAchieved = {
      type: "GoalAchieved",
      data: { id: state.id },
    };
    const newState = evolve(state, event);
    if (isAchievedGoal(newState)) {
      expect(newState.id).toEqual("goal-123");
    } else {
      expect(true).toBeFalse();
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

  test("GoalResumed on SetGoal returns unchanged state", () => {
    const state = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalResumed = { type: "GoalResumed", data: { id: "goal-123" } };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalSet on AchievedGoal returns unchanged state", () => {
    const state = { type: "AchievedGoal" as const, id: "goal-123" };
    const event: GoalSet = { type: "GoalSet", data: { id: "goal-123" } };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalAchieved on AchievedGoal returns unchanged state", () => {
    const state = { type: "AchievedGoal" as const, id: "goal-123" };
    const event: GoalAchieved = { type: "GoalAchieved", data: { id: "goal-123" } };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalAbandoned on AchievedGoal returns unchanged state", () => {
    const state = { type: "AchievedGoal" as const, id: "goal-123" };
    const event: GoalAbandoned = { type: "GoalAbandoned", data: { id: "goal-123" } };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalResumed on AchievedGoal returns unchanged state", () => {
    const state = { type: "AchievedGoal" as const, id: "goal-123" };
    const event: GoalResumed = { type: "GoalResumed", data: { id: "goal-123" } };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalAbandoned on SetGoal with matching id returns AbandonedGoal", () => {
    const state = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalAbandoned = {
      type: "GoalAbandoned",
      data: { id: state.id },
    };
    const newState = evolve(state, event);
    if (isAbandonedGoal(newState)) {
      expect(newState.id).toEqual("goal-123");
    } else {
      expect(true).toBe(false);
    }
  });

  test("GoalAbandoned on SetGoal with non-matching id returns unchanged state", () => {
    const state = { type: "SetGoal" as const, id: "goal-123" };
    const event: GoalAbandoned = {
      type: "GoalAbandoned",
      data: { id: "other-id" },
    };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalAbandoned on AbandonedGoal returns unchanged state", () => {
    const state = { type: "AbandonedGoal" as const, id: "goal-123" };
    const event: GoalAbandoned = {
      type: "GoalAbandoned",
      data: { id: "goal-123" },
    };
    const newState = evolve(state, event);
    expect(newState).toBe(state);
  });

  test("GoalResumed on AbandonedGoal with matching id returns SetGoal", () => {
    const state = { type: "AbandonedGoal" as const, id: "goal-123" };
    const event: GoalResumed = {
      type: "GoalResumed",
      data: { id: state.id },
    };
    const newState = evolve(state, event);
    if (isSetGoal(newState)) {
      expect(newState.id).toEqual("goal-123");
    } else {
      expect(true).toBe(false);
    }
  });

  test("GoalResumed on AbandonedGoal with non-matching id returns unchanged state", () => {
    const state = { type: "AbandonedGoal" as const, id: "goal-123" };
    const event: GoalResumed = {
      type: "GoalResumed",
      data: { id: "other-id" },
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

  test("returns false for GoalAbandoned event", () => {
    const event: GoalAbandoned = { type: "GoalAbandoned", data: { id: "1" } };
    expect(isGoalSet(event)).toBe(false);
  });

  test("returns false for GoalResumed event", () => {
    const event: GoalResumed = { type: "GoalResumed", data: { id: "1" } };
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

  test("returns false for GoalAbandoned event", () => {
    const event: GoalAbandoned = { type: "GoalAbandoned", data: { id: "1" } };
    expect(isGoalAchieved(event)).toBe(false);
  });

  test("returns false for GoalResumed event", () => {
    const event: GoalResumed = { type: "GoalResumed", data: { id: "1" } };
    expect(isGoalAchieved(event)).toBe(false);
  });
});

describe("isGoalAbandoned", () => {
  test("returns true for GoalAbandoned event", () => {
    const event: GoalAbandoned = { type: "GoalAbandoned", data: { id: "1" } };
    expect(isGoalAbandoned(event)).toBe(true);
  });

  test("returns false for GoalSet event", () => {
    const event: GoalSet = { type: "GoalSet", data: { id: "1" } };
    expect(isGoalAbandoned(event)).toBe(false);
  });

  test("returns false for GoalAchieved event", () => {
    const event: GoalAchieved = { type: "GoalAchieved", data: { id: "1" } };
    expect(isGoalAbandoned(event)).toBe(false);
  });

  test("returns false for GoalResumed event", () => {
    const event: GoalResumed = { type: "GoalResumed", data: { id: "1" } };
    expect(isGoalAbandoned(event)).toBe(false);
  });
});

describe("isGoalResumed", () => {
  test("returns true for GoalResumed event", () => {
    const event: GoalResumed = { type: "GoalResumed", data: { id: "1" } };
    expect(isGoalResumed(event)).toBe(true);
  });

  test("returns false for GoalSet event", () => {
    const event: GoalSet = { type: "GoalSet", data: { id: "1" } };
    expect(isGoalResumed(event)).toBe(false);
  });

  test("returns false for GoalAchieved event", () => {
    const event: GoalAchieved = { type: "GoalAchieved", data: { id: "1" } };
    expect(isGoalResumed(event)).toBe(false);
  });

  test("returns false for GoalAbandoned event", () => {
    const event: GoalAbandoned = { type: "GoalAbandoned", data: { id: "1" } };
    expect(isGoalResumed(event)).toBe(false);
  });
});
