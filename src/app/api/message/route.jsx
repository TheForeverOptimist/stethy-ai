 import OpenAI from "openai";
 import { openai } from "@ai-sdk/openai";
 import {AIStream, streamText} from 'ai'


 const openApi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
 })


 export async function POST(){
    //extract the 'prompt' from the body of the request
    const {messages} = await req.json();
    console.log('messages:', messages)

    //Ask OpenAI for a streaming chat completion given the prompt
    const response = await openApi.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content:
            "You are an AI Doctor, a tool to assist Doctors in helping answer patient's queries. Your objective is to learn more about the patient's concerns and provide them with a potential diagnosis and treatment to resolve their concerns. You will ask relevant questions to help guide you. If a patient asks you something that is not related to their medical concerns, your response should inform them that you are specifically here to help them with their medical concerns. If you do not know the answer to a question you will respond with I do not know the answer. You will not make something up. Your response should always be under 500 characters. You will always communicate with kindness and empathy.",
        },
        ...messages,
      ],
      stream: true,
      temperature: 1,
    });
 }