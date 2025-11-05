import { Mastra } from "@mastra/core/mastra";
import { PinoLogger } from "@mastra/loggers";
import { LibSQLStore } from "@mastra/libsql";
import { fitnessAgent } from "./agents/fitness-agent.js";
import { fitnessWorkflow } from "./workflows/fitness-workflow.js";
import { a2aAgentRoute } from "./routes/a2a-agent-route.js";

export const mastra = new Mastra({
  workflows: { fitnessWorkflow },
  agents: { fitnessAgent },

  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  telemetry: {
    enabled: false,
  },
  observability: {
    default: { enabled: true },
  },
  server: {
    apiRoutes: [a2aAgentRoute],
  },
});
