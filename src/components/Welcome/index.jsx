import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate('/chat-list'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Avatar alt="Chatbot Avatar" src={''} sx={{ width: 100, height: 100, marginBottom: 2 }} />
      <Typography variant="h4" gutterBottom>
        Welcome to AI Chatbot
      </Typography>
      <Button variant="contained" onClick={handleStartChat}>
        Start Chat with AI
      </Button>
    </div>
  );
}
