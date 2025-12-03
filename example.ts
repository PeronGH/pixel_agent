import { model } from "./mod.ts";

const agent1 = model("openai/gpt-4o")
  .name("calculator agent")
  .tools({ name: "calculator" })
  .temperature(0.1);

const agent2 = model("anthropic/claude-sonnet-4.5")
  .subAgents(agent1);

const result = await agent2.prompt("what is 1+1");
console.log(result);
