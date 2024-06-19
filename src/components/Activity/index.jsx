import * as React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography } from '@mui/material';

// Mock Data
const data = [
  { date: '2024-06-10', messages: 2 },
  { date: '2024-06-11', messages: 5 },
  { date: '2024-06-12', messages: 8 },
  { date: '2024-06-13', messages: 4 },
  { date: '2024-06-14', messages: 6 },
  { date: '2024-06-15', messages: 10 },
  { date: '2024-06-16', messages: 3 },
];

export default function ActivityScreen() {
  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Recent Activity
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="messages" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
