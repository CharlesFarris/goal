export type UnknownGoal = Readonly<{
  type: "UnknownGoal";
}>;

export type SetGoal = Readonly<{
  type: "SetGoal";
  id: string;
}>;

export type AchievedGoal = Readonly<{
  type: "AchievedGoal";
  id: string;
}>;

export type GoalState = UnknownGoal | SetGoal | AchievedGoal;

export function isUnknownGoal(state: GoalState): state is UnknownGoal {
  return state.type === "UnknownGoal";
}

export function isSetGoal(state: GoalState): state is SetGoal {
  return state.type === "SetGoal";
}

export function isAchievedGoal(state: GoalState): state is AchievedGoal {
  return state.type === "AchievedGoal";
}

/** Returns the initial goal state as unknown. */
export function initialState(): GoalState {
  return { type: "UnknownGoal" };
}
