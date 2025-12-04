import type { Model } from "./model/base.ts";
import { createModel } from "./model/helper.ts";
import type { Message } from "./message.ts";
import type { Tool } from "./tool.ts";
import type { Toolset } from "./toolset.ts";
import { AgentTool } from "./agent_tool.ts";

export interface AgentConfig {
  model?: Model;
  modelName: string;
  promptText: string;
  systemPrompt: string;
  temperature?: number;
  maxTokens?: number;
  tools: (Tool | Toolset)[];
  messages: Message[];
}

export class Agent {
  #data: AgentConfig;

  constructor(data?: Partial<AgentConfig>) {
    this.#data = {
      modelName: "",
      promptText: "",
      systemPrompt: "",
      tools: [],
      messages: [],
      ...data,
    };
  }

  model(): string;
  model(name: string): Agent;
  model(name?: string): Agent | string {
    if (name === undefined) {
      return this.#data.modelName;
    }
    return new Agent({
      ...this.#data,
      modelName: name,
      model: createModel(name),
    });
  }

  systemPrompt(): string;
  systemPrompt(text: string): Agent;
  systemPrompt(text?: string): Agent | string {
    if (text === undefined) {
      return this.#data.systemPrompt;
    }
    return new Agent({
      ...this.#data,
      systemPrompt: text,
    });
  }

  temperature(): number | undefined;
  temperature(value: number): Agent;
  temperature(value?: number): Agent | number | undefined {
    if (value === undefined) {
      return this.#data.temperature;
    }
    return new Agent({
      ...this.#data,
      temperature: value,
    });
  }

  maxTokens(): number | undefined;
  maxTokens(value: number): Agent;
  maxTokens(value?: number): Agent | number | undefined {
    if (value === undefined) {
      return this.#data.maxTokens;
    }
    return new Agent({
      ...this.#data,
      maxTokens: value,
    });
  }

  uses(): (Tool | Toolset)[];
  uses(...toolList: (Tool | Toolset)[]): Agent;
  uses(...toolList: (Tool | Toolset)[]): Agent | (Tool | Toolset)[] {
    if (toolList.length === 0) {
      return this.#data.tools;
    }
    return new Agent({
      ...this.#data,
      tools: toolList,
    });
  }

  messages(): Message[] {
    return this.#data.messages;
  }

  named(name: string): AgentTool {
    // Convert this agent into a Tool that can be used by other agents
    return new AgentTool(this, name);
  }
}
