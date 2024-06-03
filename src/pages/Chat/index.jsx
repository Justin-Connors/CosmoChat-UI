import React, { useEffect, useState } from 'react';
import OpenAI from 'openai-api';
import { useParams } from 'react-router-dom';


const Chat = () => {

  const API_KEY = process.env.API_KEY;
  const openai = new OpenAI({ apiKey: API_KEY });

    return (
        <div>
            <h1>Chat</h1>
        </div>
    )
}

export default Chat;
