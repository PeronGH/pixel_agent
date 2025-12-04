import type { Tool } from "./tool.ts";
import type { Agent } from "./agent.ts";

export class AgentTool implements Tool {
  name: string;
  description?: string;
  #agent: Agent;

  constructor(agent: Agent, name: string, description?: string) {
    this.#agent = agent;
    this.name = name;
    this.description = description;
  }

  who(description: string): AgentTool {
    return new AgentTool(this.#agent, this.name, description);
  }
}
