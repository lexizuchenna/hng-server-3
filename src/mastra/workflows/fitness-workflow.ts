import { createStep, createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";

// Import your existing fitness tool
import { fitnessTool } from "../tools/fitness-tool.js";
import { RuntimeContext } from "@mastra/core/runtime-context";

const runtimeContext = new RuntimeContext();

runtimeContext.set("runId", "manual-run");
runtimeContext.set("workflowId", "generate-workout");
runtimeContext.set("stepId", "generate-workout");

// STEP 1 — Generate the workout plan
const generateWorkout = createStep({
  id: "generate-workout",
  description:
    "Generates a personalized workout plan based on goal and experience level",
  inputSchema: z.object({
    goal: z
      .string()
      .describe(
        "The user's fitness goal (e.g. lose weight, build muscle, stay active)"
      ),
    level: z
      .string()
      .optional()
      .describe("Fitness experience level (beginner, intermediate, advanced)"),
  }),
  outputSchema: z.object({
    warmUp: z.array(z.string()),
    workout: z.array(z.string()),
    coolDown: z.array(z.string()),
    tips: z.array(z.string()),
  }),
  execute: async ({ inputData }) => {
    if (!inputData) throw new Error("Input data not found");

    const plan = await fitnessTool.execute({
      context: {
        goal: inputData.goal,
        level: inputData.level || "beginner",
      },
      runtimeContext: runtimeContext,
    });
    return {
      warmUp: plan.warmUp,
      workout: plan.workout,
      coolDown: plan.coolDown,
      tips: plan.nutritionTips, // ✅ map nutritionTips → tips
    };
  },
});

// STEP 2 — Generate motivational summary or extra advice
const summarizePlan = createStep({
  id: "summarize-plan",
  description:
    "Uses the fitness agent to provide motivation and explain the workout",
  inputSchema: z.object({
    warmUp: z.array(z.string()),
    workout: z.array(z.string()),
    coolDown: z.array(z.string()),
    tips: z.array(z.string()),
  }),
  outputSchema: z.object({
    summary: z.string(),
  }),
  execute: async ({ inputData, mastra }) => {
    const agent = mastra?.getAgent("fitnessAgent");

    if (!agent) {
      throw new Error("Fitness agent not found");
    }

    const prompt = `
    Based on the following workout plan, create a short, friendly motivational message and briefly explain
    how each section (warm-up, workout, cool-down) helps achieve the user's goal.

    Workout Plan:
    ${JSON.stringify(inputData, null, 2)}

    Keep the tone encouraging, concise, and suitable for a daily fitness coach.
    `;

    const response = await agent.stream([{ role: "user", content: prompt }]);

    let summaryText = "";
    for await (const chunk of response.textStream) {
      process.stdout.write(chunk);
      summaryText += chunk;
    }

    return { summary: summaryText };
  },
});

// Combine the steps into a full workflow
const fitnessWorkflow = createWorkflow({
  id: "fitness-workflow",
  description: "Generates and summarizes a personalized daily workout routine",
  inputSchema: z.object({
    goal: z.string().describe("The user's fitness goal"),
    level: z.string().optional().describe("Fitness experience level"),
  }),
  outputSchema: z.object({
    warmUp: z.array(z.string()),
    workout: z.array(z.string()),
    coolDown: z.array(z.string()),
    tips: z.array(z.string()),
    summary: z.string(),
  }),
})
  .then(generateWorkout)
  .then(summarizePlan);

fitnessWorkflow.commit();

export { fitnessWorkflow };
