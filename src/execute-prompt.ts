import { OpenAI } from "langchain/llms/openai";

export const executePrompt = async (promptContent: string) => {
  try {
    const model = new OpenAI({
      temperature: 0.9,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    return model.call(promptContent);
  } catch (e) {
    console.error(e)
  }
}
