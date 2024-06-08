import OpenAI from 'openai'
import {NextResponse} from 'next/server'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req, res){
    const {messages} = await req.json();

    if(!messages || !Array.isArray(messages)){
        return NextResponse.json({error: "Invalid request: 'messages' must be an array"}, {status: 400})
    }

      const systemMessage = {
        role: "system",
        content:
          "You are a heathcare administrative expert. Generate a pre-medical visit note based on the following conversation.",
      };

      const completeMessages = [systemMessage, ...messages];

    try{
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: completeMessages,
            max_tokens: 500,
        })

        const summary = response.choices[0].message.content.trim();
        return NextResponse.json({summary});
    }catch(error){
        console.error("Error generating summary", error);
        return NextResponse.json({error: "Error processing request"}, {status: 500})
    }
}