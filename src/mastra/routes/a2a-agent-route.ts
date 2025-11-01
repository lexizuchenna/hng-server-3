import { registerApiRoute } from "@mastra/core/server";
import { randomUUID } from "crypto";

export const a2aAgentRoute = registerApiRoute("/a2a/agent/:agentId", {
  method: "POST",
  handler: async (c) => {
    try {
      const mastra = c.get("mastra");
      const agentId = c.req.param("agentId");

      // Parse JSON-RPC 2.0 request body
      const body = await c.req.json();
      const { jsonrpc, id: requestId, params } = body;

      // ✅ Validate JSON-RPC format
      if (jsonrpc !== "2.0" || !requestId) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: requestId || null,
            error: {
              code: -32600,
              message:
                'Invalid Request: "jsonrpc" must be "2.0" and "id" is required',
            },
          },
          400
        );
      }

      // ✅ Check if agent exists
      const agent = mastra.getAgent(agentId);
      if (!agent) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: requestId,
            error: {
              code: -32602,
              message: `Agent '${agentId}' not found`,
            },
          },
          404
        );
      }

      // ✅ Extract message(s)
      const { message, messages, contextId, taskId } = params || {};
      const incomingMessages = message
        ? [message]
        : Array.isArray(messages)
        ? messages
        : [];

      console.log(incomingMessages);

      if (!incomingMessages.length) {
        return c.json(
          {
            jsonrpc: "2.0",
            id: requestId,
            error: {
              code: -32602,
              message: "No valid 'message' or 'messages' provided in params",
            },
          },
          400
        );
      }

      const mastraMessages = incomingMessages.map((msg) => ({
        role: msg.role,
        content:
          msg.parts
            ?.map((part: any) =>
              part.kind === "text"
                ? part.text
                : part.kind === "data"
                ? JSON.stringify(part.data)
                : ""
            )
            .join("\n") || "",
      }));

      const response = await agent.generate(mastraMessages);
      const agentText = response.text || "No response generated.";

      const artifacts = [
        {
          artifactId: randomUUID(),
          name: `${agentId}Response`,
          parts: [{ kind: "text", text: agentText }],
        },
      ];

      if (response.toolResults?.length) {
        artifacts.push({
          artifactId: randomUUID(),
          name: "ToolResults",
          parts: response.toolResults.map((res) => ({
            kind: "data",
            data: res,
          })),
        });
      }

      return c.json({
        jsonrpc: "2.0",
        id: requestId,
        result: {
          id: taskId || randomUUID(),
          contextId: contextId || randomUUID(),
          status: {
            state: "completed",
            timestamp: new Date().toISOString(),
            message: {
              messageId: randomUUID(),
              role: "agent",
              parts: [{ kind: "text", text: agentText }],
              kind: "message",
            },
          },
          artifacts,
          history: [
            ...incomingMessages.map((msg) => ({
              kind: "message",
              role: msg.role,
              parts: msg.parts,
              messageId: msg.messageId || randomUUID(),
            })),
            {
              kind: "message",
              role: "agent",
              parts: [{ kind: "text", text: agentText }],
              messageId: randomUUID(),
            },
          ],
          kind: "task",
        },
      });
    } catch (err: any) {
      console.error("A2A Route Error:", err);
      return c.json(
        {
          jsonrpc: "2.0",
          id: null,
          error: {
            code: -32603,
            message: "Internal Server Error",
            data: { details: err.message },
          },
        },
        500
      );
    }
  },
});
