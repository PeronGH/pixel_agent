import { ask, model, toolset } from "./mod.ts";

const calculator = { name: "calculator" };

const agent1 = model("openai/gpt-4o")
  .uses(toolset(calculator).searchable().programmatic())
  .temperature(0.1)
  .named("calculator agent")
  .who("performs mathematical calculations");

const agent2 = model("openai/gpt-4o")
  .uses(agent1);

const result = await ask(agent2, "what is 1+1");

console.log(result);
