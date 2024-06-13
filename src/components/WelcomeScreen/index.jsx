import React from 'react';
import { Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

function WelcomeScreen() {
  return (
    <div> 
      <Typography variant="h4">Welcome to CosmoChat!</Typography>

      {/*profile info here */}
      <Avatar>JC</Avatar>

      <Typography variant="h6">Chat History</Typography>
      <List>
        {/*fetch and display chat history here later */}
      </List>
    </div>
  );
}

export default WelcomeScreen;
