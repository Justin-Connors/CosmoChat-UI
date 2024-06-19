import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Layout({ children }) {
  const navigate = useNavigate();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ 
            flexGrow: 1 }}>
            AI Chatbot
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/chat-list')}>
            Chat List
          </Button>
          <Button color="inherit" onClick={() => navigate('/activity')}>
            Activity
          </Button>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
}
