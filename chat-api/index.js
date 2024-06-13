require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAIApi = require('openai');
const app = express();
const fs = require('fs');
const port = 3001;

app.use(cors());
app.use(express.json());

// Load messages from file on startup
let messages = [
  { id: 1, sender: 'Alice', content: 'Hello there!' },
  { id: 2, sender: 'Bob', content: 'Hi Alice!' }
];

try {
  const data = fs.readFileSync('./messages.json');
  messages = JSON.parse(data);
} catch (err) {
  if (err.code === 'ENOENT') {
    console.warn('messages.json not found, starting with empty array.');
  } else {
    console.error('Error loading messages:', err);
  }
}

const openai = new OpenAIApi.OpenAI({
  
});

app.post('/api/messages', async (req, res) => {
  try {
    const newMessage = req.body;

    if (!newMessage.sender || !newMessage.content) {
      return res.status(400).json({ error: 'Sender and content are required' });
    }

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: newMessage.content },
      ],
    });
    console.log('OpenAI Response:', completion);
    console.log('OpenAI Response Choices', completion.data.choices);

    const aiResponse = {
      id: messages.length + 1, // Since initial messages have IDs 1 and 2
      sender: 'AI',
      content: completion.data.choices[0].message.content,
      timestamp: new Date().toISOString(),
    };

    // Add both messages to the array and send as a response
    messages.push(newMessage, aiResponse);
    fs.writeFileSync('./messages.json', JSON.stringify(messages, null, 2)); // Pretty-print JSON for readability
    res.status(201).json([newMessage, aiResponse]);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
});

app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
