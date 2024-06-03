import React, { useEffect, useState } from 'react';
import OpenAI from 'openai-api';
import { useParams } from 'react-router-dom';


const Chat = () => {

  const OPEN_AI_KEY = process.env.OPENAI_KEY;
  const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat;
