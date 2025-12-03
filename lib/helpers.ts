import { Agent } from "./agent.ts";

export function model(name: string): Agent {
  return new Agent().model(name);
}
