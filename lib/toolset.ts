import type { Tool } from "./tool.ts";

interface ToolsetConfig {
  tools: Tool[];
  isSearchable: boolean;
  isProgrammatic: boolean;
}

export class Toolset {
  #config: ToolsetConfig;

  constructor(tools: Tool[], config?: Partial<ToolsetConfig>) {
    this.#config = {
      tools,
      isSearchable: false,
      isProgrammatic: false,
      ...config,
    };
  }

  searchable(): Toolset {
    return new Toolset(this.#config.tools, {
      ...this.#config,
      isSearchable: true,
    });
  }

  programmatic(): Toolset {
    return new Toolset(this.#config.tools, {
      ...this.#config,
      isProgrammatic: true,
    });
  }
}

export function toolset(...tools: Tool[]): Toolset {
  return new Toolset(tools);
}
