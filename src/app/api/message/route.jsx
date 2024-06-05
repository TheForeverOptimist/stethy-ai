import OpenAI from 'openai'
import {NextResponse} from 'next/server'


 const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
 });

 export async function POST(req, res){
    if(req.method !== 'POST'){
      res.status(405).end()
      return;
    }

    const { messages } = await req.json();

    const systemMessage = {
      role: "system",
      content: "You are a helpful and knowledgeable health consultant. Your role is to ask relevant questions about the user's health issues and provide reasonable treatment plans or advice based on their responses.",
    };

    const completeMessages = [systemMessage, ...messages];

    try {
      const stream = await openai.chat.completions.create({
        model: "gpt-4",
        messages: completeMessages,
        stream: true,
      });

      return new NextResponse(
        new ReadableStream({
          async start(controller){
            for await (const chunk of stream){
              const content = chunk.choices[0]?.delta?.content || '';
              controller.enqueue(new TextEncoder().encode(content));
            }
            controller.close()
          },
        }),
        {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          }
        
        }
      );
      }
  
    catch(error){
      console.error("Error calling OpenAI API", error);
      return NextResponse.json({error: 'Error processing request'}, {status: 500});
    }
  

}