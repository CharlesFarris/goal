import type { Event } from "@event-driven-io/emmett";
import {
  type GoalState,
  isAchievedGoal,
  isSetGoal,
  isUnknownGoal,
} from "./goalState";

export type GoalSet = Event<
  "GoalSet",
  {
    id: string;
  }
>;

export type GoalAchieved = Event<
  "GoalAchieved",
  {
    id: string;
  }
>;

export type GoalEvent = GoalSet | GoalAchieved;

export function isGoalSet(event: GoalEvent): event is GoalSet {
  return event.type === "GoalSet";
}

export function isGoalAchieved(event: GoalEvent): event is GoalAchieved {
  return event.type === "GoalAchieved";
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
    }
  } else if (isAchievedGoal(state)) {
  }
  return state;
}
