import type {
  GoalAbandoned,
  GoalAchieved,
  GoalEvent,
  GoalSet,
} from "./goalEvent.ts";
import {
  evolve,
  isGoalAbandoned,
  isGoalAchieved,
  isGoalSet,
} from "./goalEvent.ts";
import type {
  AbandonedGoal,
  AchievedGoal,
  GoalState,
  SetGoal,
  UnknownGoal,
} from "./goalState.ts";
import {
  initialState,
  isAbandonedGoal,
  isAchievedGoal,
  isSetGoal,
  isUnknownGoal,
} from "./goalState.ts";

export type {
  AbandonedGoal,
  AchievedGoal,
  GoalAbandoned,
  GoalAchieved,
  GoalEvent,
  GoalSet,
  GoalState,
  SetGoal,
  UnknownGoal,
};

export {
  evolve,
  initialState,
  isAbandonedGoal,
  isAchievedGoal,
  isGoalAbandoned,
  isGoalAchieved,
  isGoalSet,
  isSetGoal,
  isUnknownGoal,
};
