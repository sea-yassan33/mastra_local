
import { Mastra } from '@mastra/core/mastra';
import { PinoLogger } from '@mastra/loggers';
import { LibSQLStore } from '@mastra/libsql';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { toolCallAppropriatenessScorer, completenessScorer, translationScorer } from './scorers/weather-scorer';
import { OllamaAgent } from './agents/mcpAgent';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  // OllamaAgentを追加
  agents: { weatherAgent, OllamaAgent },
  scorers: { toolCallAppropriatenessScorer, completenessScorer, translationScorer },
  storage: new LibSQLStore({
    url: ":memory:",
  }),
  logger: new PinoLogger({
    name: 'Mastra',
    level: 'info',
  }),
  telemetry: {
    // telemetry非推奨になり、廃止される予定
    enabled: false, 
  },
  observability: {
    // AI トレース用に DefaultExporter と CloudExporter を有効にする
    default: { enabled: true }, 
  },
});

