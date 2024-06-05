import {Configuration, OpenAIApi} from "openai"


 const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
 });

 const openai = new OpenAIApi(configuration)


 export default async function handler(req, res){
    if(req.method !== 'POST'){
      res.status(405).end()
      return;
    }

    const { messages } = req.body;

    const systemMessage = {
      role: "system",
      content: "You are a helpful and knowledgeable health consultant. Your role is to ask relevant questions about the user's health issues and provide reasonable treatment plans or advice based on their responses.",
    };

    const completeMessages = [systemMessage, ...messages];

    try {
      const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: completeMessages,
      })

      res.status(200).json(completion.data.choices[0].message);
    }catch(error){
      console.error("Error calling OpenAI API", error);
      res.status(500).json({error: "Error processing request"});
    }
  

}