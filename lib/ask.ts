import type { Agent } from "./agent.ts";

class AgentExecution implements PromiseLike<string>, AsyncIterable<string> {
  constructor(private agent: Agent, private prompt: string) {}

  then<TResult1 = string, TResult2 = never>(
    onfulfilled?: ((value: string) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    // TODO: Implement actual agent execution logic
    return Promise.resolve("" as string).then(onfulfilled, onrejected);
  }

  async *[Symbol.asyncIterator](): AsyncIterator<string> {
    // TODO: Implement streaming logic
    yield "";
  }
}

export function ask(
  agent: Agent,
  prompt: string,
): PromiseLike<string> & AsyncIterable<string> {
  return new AgentExecution(agent, prompt);
}
