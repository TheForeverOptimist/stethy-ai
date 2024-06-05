import OpenAI from 'openai'


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
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: completeMessages,
      })

      res.status(200).json(completion.data.choices[0].message);
    }catch(error){
      console.error("Error calling OpenAI API", error);
      res.status(500).json({error: "Error processing request"});
    }
  

}