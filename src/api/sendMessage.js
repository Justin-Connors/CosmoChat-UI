export const sendMessageToChatGPT = async (message) => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo', 
        messages: [{ role: 'user', content: message }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
    }

    const data = await response.json();
    console.log('API response:', data); 

    if (!data.choices || data.choices.length === 0) {
      throw new Error('No choices returned from the API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error communicating with OpenAI API:', error);
    return 'Sorry, something went wrong. Please try again later.';
  }
};
