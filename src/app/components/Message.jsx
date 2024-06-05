"use client"

import React from 'react'

const Message = ({role, content}) => {
    const isUser = role === 'user';
    return (
        <div className={`message ${isUser ? 'user' : 'ai'}`}>
            {content}
        </div>
    )
}

export default Message