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
    // stores observability, scores, ... into memory storage, if it needs to persist, change to file:../mastra.db
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: "Mastra",
    level: "info",
  }),
  telemetry: {
    // Telemetry is deprecated and will be removed in the Nov 4th release
    enabled: false,
  },
  observability: {
    // Enables DefaultExporter and CloudExporter for AI tracing
    default: { enabled: true },
  },
  server: {
    apiRoutes: [a2aAgentRoute],
  },
});
