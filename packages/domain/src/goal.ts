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

export type Goal = UnknownGoal | SetGoal | AchievedGoal;

/** Returns the initial goal state as unknown. */
export function initialState(): Goal {
  return { type: "UnknownGoal" };
}
