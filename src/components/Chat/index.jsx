import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, Button, 
  Typography, Box,
  List, ListItem, ListItemText, 
  IconButton, Divider 
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import StopIcon from '@mui/icons-material/Stop';
import SendIcon from '@mui/icons-material/Send';
import OpenAI from 'openai';
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export default function ChatScreen({ activeChats, setActiveChats, endedChats, setEndedChats }) {
  const location = useLocation();
  const navigate = useNavigate();
  const chatId = location.state?.chatId;

  React.useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('chats')) || [];
    const chat = storedChats.find(chat => chat.id === chatId); 
    if (chat) {
      setMessages(chat.messages || []);
    } 
  }, [chatId]);

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch initial messages for the chat (if any)

  }, [chatId]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); 

  const handleSendMessage = async () => {
    if (!userInput.trim()) return; 

    const newMessage = { role: 'user', content: userInput };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setUserInput('');

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [...messages, newMessage],
      });

      const aiResponse = { role: 'assistant', content: completion.data.choices[0].message.content };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error sending message to OpenAI:', error);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const handleEndChat = () => {
    setActiveChats(prevActiveChats => {
      const updatedActiveChats = prevActiveChats.filter(chat => chat.id !== chatId);
      const endedChat = prevActiveChats.find(chat => chat.id === chatId);

      if (endedChat) {
        setEndedChats(prevEndedChats => [...prevEndedChats, { ...endedChat, ended: true }]);
      }
      
      return updatedActiveChats;
    });

    navigate('/chat-list');
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6">Chat with AI {chatId}</Typography>
        <Box>
        <Tooltip title="Clear Chat">
            <IconButton onClick={handleClearChat} color="secondary">
              <ClearIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="End Chat">
            <IconButton onClick={handleEndChat} color="error">
              <StopIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Divider />

      <List sx={{ height: 400, overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={msg.content}
              secondary={msg.role === 'user' ? 'You' : 'AI'}
            />
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>

      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <TextField
          label="Type your message"
          variant="outlined"
          fullWidth
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && handleSendMessage()}
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" endIcon={<SendIcon />} onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
}
