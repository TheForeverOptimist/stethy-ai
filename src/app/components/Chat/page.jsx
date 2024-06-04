import React from 'react'
import {useChat} from 'ai/react'

const Chat = () => {
    const {messages, input, handleInputChange, handleSubmit} =useChat({
        api: openai
    })

    const chatContainer = useRef(null)

    const scroll = () => {
        const {offsetHeight, scrollHeight, scrollTop} = chatContainer.current
        if(scrollHeight >= scrollTop + offsetHeight){
            chatContainer.current?.scrollTo(0, scrollHeight + 200)
        }
    }



    const renderResponse = () => {
        return(
            <div className='response'>
                {messages.map((m, index) => (
                    <div key={m.id} className={`chat-line ${m.role === 'user' ? 'user-chat' : 'ai-chat'}`}>
                        <div style={{width: '100%', marginLeft: '16px'}}>
                            <p>{m.content}</p>
                            {index < messages.length - 1 && <div className="horizontal-line" />}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

return (
    <div ref={chatContainer} className="chat">
        {renderResponse()}
        <form onSubmit={handleSubmit} className="mainForm">
            <input name="input-field" type="text" placeholder="Ask what you want" onChange={handleInputChange} value={input} />
            <button className="mainBtn"></button>
        </form>
    </div>
)}


export default Chat