import OpenAI from 'openai'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req, res){
    const {messages} = req.body;

    const prompt = `Generate a pre-medical visit note based on the following conversation: ${messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}`;

    try{
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            prompt: prompt,
            max_tokens: 500,
        })

        const summary = response.choices[0].text.trim();
        res.status(200).json({summary});
    }catch(error){
        console.error("Error generating summary", error);
        res.status(500).json({error: "Error processing request"})
    }
}