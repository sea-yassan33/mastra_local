import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { MCPClient } from "@mastra/mcp";
import { createOllama } from 'ollama-ai-provider-v2';
import 'dotenv/config';
import path from 'path';

const ollama = createOllama({
  baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/api',
});
const mcp = new MCPClient({
  servers: {
    "dice-roller": {
      "command": "npx",
      "args": [
        "-y", "@mastra/mcp-docs-server"
      ],
    },
  },
});

export const OllamaAgent = new Agent({
  name: 'Ollama Agent',
  instructions: `
      あなたはプログラミングが得意なAIエージェントです。
  `,
  model: ollama(process.env.OLLAMA_MODEL || 'gpt-oss:20b'),
  tools: await mcp.getTools(),
  memory: new Memory({
    storage: new LibSQLStore({
      // パスは.mastra/outputディレクトリからの相対パス
      url: `file:${path.resolve(process.cwd(), 'mastra.db')}`,
    }),
  }),
});