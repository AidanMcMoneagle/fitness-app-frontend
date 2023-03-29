const type = [
  "cardio",
  "olympic_weightlifting",
  "plyometrics",
  "powerlifting",
  "strength",
  "stretching",
  "strongman",
];

const muscle = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

const difficulty = ["beginner", "intermediate", "expert"];

export const typeOptions = type.map((type) => {
  return { value: type, label: type };
});

export const muscleOptions = muscle.map((muscle) => {
  return { value: muscle, label: muscle };
});

export const difficultyOptions = difficulty.map((diff) => {
  return { value: diff, label: diff };
});
