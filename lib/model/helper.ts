import type { Model } from "./base.ts";
import { OpenAIModel } from "./openai.ts";

const PROVIDERS: Record<string, (model: string) => Model> = {
  "openai": (name) => new OpenAIModel(name),
};

export function createModel(name: string): Model {
  const [providerName, modelName] = name.split("/");
  return PROVIDERS[providerName](modelName);
}
