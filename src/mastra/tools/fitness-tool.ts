import { createTool } from "@mastra/core/tools";
import { z } from "zod";

/**
 * Define the input and output schemas for the tool.
 * This ensures that when the Mastra Agent calls the tool,
 * the inputs and outputs are validated automatically.
 */
export const fitnessTool = createTool({
  id: "generate-fitness-plan",
  description:
    "Create a personalized daily workout plan based on a user's fitness goal and experience level.",

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

  /**
   * The main function that runs when the agent calls this tool.
   * It dynamically generates a structured plan based on input.
   */
  execute: async ({ context }) => {
    const goal = context.goal.toLowerCase();
    const level = (context.level || "beginner").toLowerCase();

    return getFitnessPlan(goal, level);
  },
});

/**
 * Internal function that determines exercises and advice dynamically
 * based on user goal and experience level.
 */
function getFitnessPlan(goal: string, level: string) {
  const warmUp = [
    "5 minutes of light jogging or marching in place",
    "10 arm circles (forward and backward)",
    "Dynamic leg swings for 1 minute",
  ];

  const coolDown = [
    "3 minutes of gentle walking",
    "Static stretching for major muscles (hamstrings, shoulders, calves)",
    "Deep breathing for relaxation (2 minutes)",
  ];

  let workout: string[] = [];
  let nutritionTips: string[] = [];
  let motivation = "";

  switch (goal) {
    case "lose weight":
      workout = [
        "3 sets of 20 jumping jacks",
        "3 sets of 15 squats",
        "2 sets of 20 mountain climbers",
        "2 sets of 10 burpees",
        "20-minute brisk walk or jog",
      ];
      nutritionTips = [
        "Reduce sugar intake and avoid late-night snacking",
        "Drink at least 2–3 litres of water daily",
        "Eat more vegetables, fruits, and lean protein",
      ];
      motivation = "Consistency beats intensity — stay active daily!";
      break;

    case "build muscle":
      workout = [
        "3 sets of 10 push-ups",
        "3 sets of 12 lunges per leg",
        "3 sets of 15 squats",
        "3 sets of 30-second planks",
        "Optional: lift weights or resistance bands",
      ];
      nutritionTips = [
        "Consume more protein (chicken, eggs, beans, tofu)",
        "Increase calorie intake gradually",
        "Avoid overtraining — rest builds muscle",
      ];
      motivation = "Push harder each week and track your progress!";
      break;

    case "improve endurance":
      workout = [
        "15 minutes steady jogging or cycling",
        "3 sets of 1-minute jump rope",
        "2 sets of 30 high knees",
        "3 sets of 15 push-ups",
        "Finish with 10 minutes of stretching",
      ];
      nutritionTips = [
        "Eat balanced meals with complex carbs and lean protein",
        "Stay hydrated before and after workouts",
        "Get enough sleep to recover",
      ];
      motivation = "Train your stamina, and your strength will follow!";
      break;

    case "stay active":
    default:
      workout = [
        "10-minute walk",
        "10 squats",
        "10 push-ups",
        "10 sit-ups",
        "Stretch for 5 minutes",
      ];
      nutritionTips = [
        "Avoid prolonged sitting — move every hour",
        "Eat home-cooked meals often",
        "Choose water over soda or energy drinks",
      ];
      motivation = "Small daily steps lead to big results!";
      break;
  }

  // Adjust difficulty based on experience level
  if (level === "intermediate") {
    workout = workout.map((w) => w + " — increase reps by 25%");
  } else if (level === "advanced") {
    workout = workout.map((w) => w + " — increase intensity or add weights");
  }

  return {
    warmUp,
    workout,
    coolDown,
    nutritionTips,
    motivation,
  };
}
