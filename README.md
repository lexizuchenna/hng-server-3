# Mastra Fitness Agent — Intelligent Fitness Workflow & API

This project is a **Mastra-powered AI fitness assistant** that generates personalized workout plans, nutritional advice, and motivational summaries.  
It integrates tools, workflows, and an **A2A (Agent-to-Agent)** API route built and integrated into Telex

---

## Features

✅ AI-powered fitness planning using **Mastra Agents & Tools**  
✅ Structured workflow for generating and summarizing fitness routines  
✅ Persistent memory using **LibSQL (SQLite)**  
✅ JSON-RPC 2.0 compliant **A2A endpoint**  
✅ Modular architecture (Agents, Tools, Workflows, Routes)  
✅ Uses **Google Gemini 2.0 Flash** as the LLM model

---

## How It Works

1. **User sends a message** (e.g. “Create a workout for muscle gain”).
2. The **Fitness Agent** interprets the goal and level.
3. It calls the **`fitnessTool`**, which generates:
   - Warm-up routines
   - Main workout plan
   - Cool-down stretches
   - Nutrition tips
   - Motivation quote
4. The **`fitnessWorkflow`** summarizes the plan for readability.
5. The **A2A route** serves JSON-RPC compatible responses to external apps.

---

## Setup Instructions

### 1. Clone and Install

```bash
git clone https://github.com/lexizuchenna/hng-server-3.git
cd hng-server-3
pnpm install
```

## 2. Create Environment File

Rename `.example.env` → `.env` and set your **Google Generative AI API key**:

```bash
GOOGLE_GENERATIVE_AI_API_KEY=your_google_api_key_here
```

## 3. Run in Development

Start your local Mastra server:

```bash
pnpm dev
```

The server will start on port 4111

## 4. Test the A2A Route

Once running, you can test your agent using `curl` or any HTTP client:

```bash
curl -X POST http://localhost:4111/a2a/agent/fitnessAgent \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "sendMessage",
    "params": {
      "message": {
        "role": "user",
        "parts": [
          { "kind": "text", "text": "Create a workout plan to build muscle for a beginner" }
        ]
      }
    }
  }'
```

Example response

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "status": {
      "state": "completed",
      "message": {
        "role": "agent",
        "parts": [
          {
            "kind": "text",
            "text": "Here’s your beginner muscle-building plan..."
          }
        ]
      }
    },
    "artifacts": [...],
    "kind": "task"
  }
}
```

## Integration Notes

You can connect this API directly to **Telex**, **Zapier**, or any bot platform.

- The route supports multiple messages (conversation arrays).
- The response format is fully **JSON-RPC compatible** for agent chaining.

---

## Technologies Used

| Technology                                        | Description                                                                                    |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [**Mastra**](https://docs.mastra.ai/)             | A powerful framework for building AI agents, workflows, and integrations using TypeScript.     |
| [**TypeScript**](https://www.typescriptlang.org/) | A strongly typed superset of JavaScript that enhances code quality and developer productivity. |

---

## Author

**Alexander Ukwueze**

- **LinkedIn**: [lexizuchenna](https://www.linkedin.com/in/lexizuchenna)
- **Twitter**: [@lexiz_tech](https://twitter.com/lexiz_tech)
