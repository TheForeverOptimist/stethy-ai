import React from 'react'
import './Intro.css'
import Options from '@/app/components/Options'

export default function Intro(){
    return (
      <div className="typing-animation">
        <span className="typing-indicator">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </span>
        <span className="text">Hi! How may I assist you?</span>
        <Options />
      </div>
    );
}