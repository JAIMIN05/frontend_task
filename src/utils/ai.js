const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const summarizeNote = async (text) => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{
          role: "user",
          content: `Please provide a concise summary (maximum 2-3 sentences) of the following text, focusing on the main points only: "${text}". Keep the summary clear and direct, avoiding unnecessary details.`
        }],
        max_tokens: 150, // Limit response length
        temperature: 0.3 // Lower temperature for more focused responses
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to summarize note:', error);
    return null;
  }
};

export const grammarCheck = async (text) => {
  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{
          role: "user",
          content: `Please check the following text for grammar and provide suggestions: ${text}`
        }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to check grammar:', error);
    return null;
  }
};