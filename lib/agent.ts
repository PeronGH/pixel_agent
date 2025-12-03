import type { Model } from "./model/base.ts";
import { createModel } from "./model/helper.ts";
import type { Message } from "./message.ts";
import type { Tool } from "./tool.ts";

export class Agent implements PromiseLike<string>, AsyncIterable<string> {
  #model: Model | undefined;
  #modelName: string = "";
  #promptText: string = "";
  #systemPrompt: string = "";
  #temperature: number | undefined;
  #maxTokens: number | undefined;
  #tools: Tool[] = [];
  #messages: Message[] = [];
  #name: string = "";
  #description: string = "";
  #subAgents: Agent[] = [];

  model(): string;
  model(name: string): this;
  model(name?: string): this | string {
    if (name === undefined) {
      return this.#modelName;
    }
    this.#modelName = name;
    this.#model = createModel(name);
    return this;
  }

  prompt(): string;
  prompt(text: string): this;
  prompt(text?: string): this | string {
    if (text === undefined) {
      return this.#promptText;
    }
    this.#promptText = text;
    return this;
  }

  systemPrompt(): string;
  systemPrompt(text: string): this;
  systemPrompt(text?: string): this | string {
    if (text === undefined) {
      return this.#systemPrompt;
    }
    this.#systemPrompt = text;
    return this;
  }

  temperature(): number | undefined;
  temperature(value: number): this;
  temperature(value?: number): this | number | undefined {
    if (value === undefined) {
      return this.#temperature;
    }
    this.#temperature = value;
    return this;
  }

  maxTokens(): number | undefined;
  maxTokens(value: number): this;
  maxTokens(value?: number): this | number | undefined {
    if (value === undefined) {
      return this.#maxTokens;
    }
    this.#maxTokens = value;
    return this;
  }

  tools(): Tool[];
  tools(...toolList: Tool[]): this;
  tools(...toolList: Tool[]): this | Tool[] {
    if (toolList.length === 0) {
      return this.#tools;
    }
    this.#tools = toolList;
    return this;
  }

  messages(): Message[] {
    return this.#messages;
  }

  name(): string;
  name(value: string): this;
  name(value?: string): this | string {
    if (value === undefined) {
      return this.#name;
    }
    this.#name = value;
    return this;
  }

  description(): string;
  description(value: string): this;
  description(value?: string): this | string {
    if (value === undefined) {
      return this.#description;
    }
    this.#description = value;
    return this;
  }

  subAgents(): Agent[];
  subAgents(...agents: Agent[]): this;
  subAgents(...agents: Agent[]): this | Agent[] {
    if (agents.length === 0) {
      return this.#subAgents;
    }
    // Validate that each agent has name OR description OR both
    for (const agent of agents) {
      if (!agent.name() && !agent.description()) {
        throw new Error("Sub-agents must have a name or description");
      }
    }
    this.#subAgents = agents;
    return this;
  }

  clone(): Agent {
    const cloned = new Agent();
    cloned.#model = this.#model;
    cloned.#modelName = this.#modelName;
    cloned.#promptText = this.#promptText;
    cloned.#systemPrompt = this.#systemPrompt;
    cloned.#temperature = this.#temperature;
    cloned.#maxTokens = this.#maxTokens;
    cloned.#tools = [...this.#tools];
    cloned.#messages = [...this.#messages];
    cloned.#name = this.#name;
    cloned.#description = this.#description;
    cloned.#subAgents = [...this.#subAgents];
    return cloned;
  }

  forget(): this {
    this.#messages = [];
    return this;
  }

  then<TResult1 = string, TResult2 = never>(
    onfulfilled?: ((value: string) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.resolve("" as string).then(onfulfilled, onrejected);
  }

  async *[Symbol.asyncIterator](): AsyncIterator<string> {
    yield "";
  }
}
