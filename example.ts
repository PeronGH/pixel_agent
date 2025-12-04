import { ask, model } from "./mod.ts";

const calculator = { name: "calculator" };

const agent1 = model("openai/gpt-4o")
  .uses(calculator)
  .temperature(0.1);

const result = await ask(agent1, "what is 1+1");

console.log(result);
