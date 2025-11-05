import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import {
  coolDownOptions,
  motivationLines,
  nutritionTipsBank,
  warmUpOptions,
  workoutsByGoal,
} from "../constants";

export const fitnessTool = createTool({
  id: "generate-fitness-plan",
  description:
    "Create a personalized daily workout plan based on a user's fitness goal and experience level, with variation and dynamic responses.",

  inputSchema: z.object({
    goal: z
      .string()
      .describe(
        "User's fitness goal, e.g. 'lose weight', 'build muscle', 'improve endurance', 'stay active'"
      ),
    level: z
      .string()
      .optional()
      .describe(
        "User's experience level: beginner, intermediate, or advanced (default is beginner)"
      ),
  }),

  outputSchema: z.object({
    warmUp: z.array(z.string()),
    workout: z.array(z.string()),
    coolDown: z.array(z.string()),
    nutritionTips: z.array(z.string()),
    motivation: z.string(),
  }),

  //@ts-ignore
  execute: async ({ context }) => {
    const goal = context.goal.toLowerCase();
    const level = (context.level || "beginner").toLowerCase();
    return getDynamicFitnessPlan(goal, level);
  },
});

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

function getDynamicFitnessPlan(goal: string, level: string) {
  const workouts = getRandomItem(
    workoutsByGoal[goal] || workoutsByGoal["stay active"]
  );
  const warmUp = getRandomItem(warmUpOptions);
  const coolDown = getRandomItem(coolDownOptions);
  const nutritionTips = shuffle(
    //@ts-ignore
    nutritionTipsBank[goal] || nutritionTipsBank["stay active"]
  ).slice(0, 3);
  const motivation = getRandomItem(motivationLines);

  // 🔹 Level modifiers
  let adjustedWorkout = [...workouts];
  if (level === "intermediate") {
    adjustedWorkout = adjustedWorkout.map(
      (w) => w + " — add 1 more set or increase duration"
    );
  } else if (level === "advanced") {
    adjustedWorkout = adjustedWorkout.map(
      (w) => w + " — add resistance or increase intensity"
    );
  }

  return {
    warmUp,
    workout: adjustedWorkout,
    coolDown,
    nutritionTips,
    motivation,
  };
}
