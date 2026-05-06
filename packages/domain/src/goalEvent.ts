import type { Event } from "@event-driven-io/emmett";
import {
  type GoalState,
  isAbandonedGoal,
  isAchievedGoal,
  isSetGoal,
  isUnknownGoal,
} from "./goalState.ts";

export type GoalSet = Event<"GoalSet", { id: string }>;

export type GoalAchieved = Event<"GoalAchieved", { id: string }>;

export type GoalAbandoned = Event<"GoalAbandoned", { id: string }>;

export type GoalResumed = Event<"GoalResumed", { id: string }>;

export type GoalEvent = GoalSet | GoalAchieved | GoalAbandoned | GoalResumed;

export function isGoalSet(event: GoalEvent): event is GoalSet {
  return event.type === "GoalSet";
}

export function isGoalAchieved(event: GoalEvent): event is GoalAchieved {
  return event.type === "GoalAchieved";
}

export function isGoalAbandoned(event: GoalEvent): event is GoalAbandoned {
  return event.type === "GoalAbandoned";
}

export function isGoalResumed(event: GoalEvent): event is GoalResumed {
  return event.type === "GoalResumed";
}

export function evolve(state: GoalState, event: GoalEvent): GoalState {
  if (isUnknownGoal(state)) {
    if (isGoalSet(event)) {
      return {
        type: "SetGoal",
        id: event.data.id,
      };
    }
  } else if (isSetGoal(state)) {
    if (isGoalAchieved(event) && event.data.id === state.id) {
      return {
        type: "AchievedGoal",
        id: state.id,
      };
    } else if (isGoalAbandoned(event) && event.data.id === state.id) {
      return {
        type: "AbandonedGoal",
        id: state.id,
      };
    }
  } else if (isAchievedGoal(state)) {
    // TODO
  } else if (isAbandonedGoal(state)) {
    if (isGoalResumed(event) && event.data.id === state.id) {
      return {
        type: "SetGoal",
        id: state.id,
      };
    }
  }
  return state;
}
