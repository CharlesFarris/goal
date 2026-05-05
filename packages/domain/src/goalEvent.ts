import type { Event } from "@event-driven-io/emmett";
import { randomUUIDv7 } from "bun";
import type { Goal } from "./goal";

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

export function evolve(state: Goal, event: GoalEvent): Goal {
  switch (state.type) {
    case "UnknownGoal":
      if (event.type === "GoalSet") {
        return {
          type: "SetGoal",
          id: randomUUIDv7(),
        };
      }
      break;
    case "SetGoal":
      if (event.type === "GoalAchieved" && event.data.id === state.id) {
        return {
          type: "AchievedGoal",
          id: state.id,
        };
      }
      break;
    case "AchievedGoal":
      break;
  }
  return state;
}
