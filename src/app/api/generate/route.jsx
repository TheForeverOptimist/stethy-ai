import OpenAI from 'openai'
import { generateSummaryFromMessages } from '../../../../utils/openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req, res){
    const {messages} = req.body;

    if(!messages || !Array.isArray(messages)){
        return res.status(400).json({error: "Invalid request: 'messages' must be an array"})
    }

    try{
        const response = await openai.chat.completions.create({
            model: "gpt-4-1106-preview",
            messages: completeMessages,
            max_tokens: 500,
        })

        const summary = response.choices[0].text.trim();
        res.status(200).json({summary});
    }catch(error){
        console.error("Error generating summary", error);
        res.status(500).json({error: "Error processing request"})
    }
}