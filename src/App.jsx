import React, { useState } from 'react';
import { Box } from '@mui/material';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { sendMessageToChatGPT } from './api/sendMessage';

const App = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (message) => {
    setMessages(prevMessages => [...prevMessages, `You: ${message}`]);
    
    try {
      const reply = await sendMessageToChatGPT(message);
      setMessages(prevMessages => [...prevMessages, `ChatGPT: ${reply}`]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prevMessages => [...prevMessages, 'ChatGPT: Sorry, something went wrong. Please try again later.']);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <ChatWindow messages={messages} />
      <ChatInput onSend={handleSend} />
    </Box>
  );
};

export default App;
