import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Avatar } from '@mui/material';
import ChatHeader from '../ChatHeader/index';
import ChatBody from '../ChatBody/index';
import ChatFooter from '../ChatFooter/index';

function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Cosmo AI', content: 'Hello! How can I help you today?', timestamp: new Date("2024-06-12T12:00:00") },
    { id: 2, sender: 'You', content: 'I need help with writing a code snippet.', timestamp: new Date("2024-06-12T12:05:00") },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const newMessage = { id: messages.length + 1, sender: 'You', content: inputText, timestamp: new Date() };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputText('');
    setIsLoading(true); 

    // Simulate AI response (replace this with actual API call later)
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        sender: 'Cosmo AI',
        content: 'Here\'s a code snippet to help you: \n\n`javascript\n// Your code here\n`',
        timestamp: new Date(),
      };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ChatHeader recipient="Cosmo AI" />
      <ChatBody messages={messages} />
      <ChatFooter onSendMessage={handleSendMessage} />
    </Box>
  );
}

export default Chat;
