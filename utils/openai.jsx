


export const getResponseFromOpenAI = async (messages, onData) => {
    try{
        const response = await fetch('api/message', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({messages}),
        })

        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        const reader = response.body.getReader()
        const decoder = new TextDecoder();

        while(true){
            const {done, value} = await reader.read();
            if(done) break;
            const chunk = decoder.decode(value, {stream: true});
            onData(chunk)
        }

    }catch(error){
        console.error("Error fetching response from OpenAI", error);
        return null;
    }
}

export const generateSummaryFromMessages = async (messages) => {
  try {
    const response = await fetch("/api/generateSummary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.summary;
  } catch (error) {
    console.error("Error generating summary", error);
    throw new Error("Error generating summary");
  }
};