const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

// Common technical terms and their definitions
const technicalTerms = {
  "React": "A JavaScript library for building user interfaces",
  "JavaScript": "A programming language used to create interactive web applications",
  "API": "Application Programming Interface - a way for different software systems to communicate",
  "HTML": "HyperText Markup Language - the standard language for creating web pages",
  "CSS": "Cascading Style Sheets - a language used to style web pages",
  "DOM": "Document Object Model - a programming interface for HTML documents",
  "Component": "A reusable piece of UI in React applications",
  "Frontend": "The client-side part of a website that users interact with",
  "Backend": "The server-side of an application that handles data and business logic",
  "Database": "A structured system for storing and managing data"
};

export const findAndDefineTerms = async (text) => {
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
          content: `Identify and define technical terms in this text. Return as JSON with term:definition pairs. Maximum 5 terms. Text: "${text}"`
        }],
        max_tokens: 200,
        temperature: 0.3
      })
    });

    const data = await response.json();
    const aiTerms = JSON.parse(data.choices[0].message.content);
    return { ...technicalTerms, ...aiTerms };
  } catch (error) {
    console.error('Failed to identify terms:', error);
    return technicalTerms;
  }
};

export const highlightTerms = (text) => {
  let highlightedContent = text;
  Object.entries(technicalTerms).forEach(([term, definition]) => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    highlightedContent = highlightedContent.replace(
      regex,
      `<span class="glossary-term" data-definition="${definition}">${term}</span>`
    );
  });
  return highlightedContent;
};