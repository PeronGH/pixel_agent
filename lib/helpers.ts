import { Agent } from "./agent.ts";
import { ask } from "./ask.ts";

export function model(name: string): Agent {
  return new Agent().model(name);
}

export { ask };
