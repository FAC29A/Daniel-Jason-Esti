const apiKey = 'CiA5CJYu0d7lRSrteot5T3BlbkFJnD5QpQLbZMkh43J06vbX'; 
const sourceText = "Please translate this exact phrase into Hebrew. making sure you keep the same tone & nuance as the original message";

// Endpoint for translation API (replace with the actual endpoint provided by the API provider)
const apiUrl = 'https://api.example.com/translate';

// Function to translate text using the AI API
async function translateText(apiKey, text) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      text,
      targetLanguage: 'he', // 'he' is the language code for Hebrew
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation failed with status: ${response.status}`);
  }

  const result = await response.json();
  return result.translatedText;
}

// Translate the text
translateText(apiKey, sourceText)
  .then(translatedText => console.log(`Translated Text: ${translatedText}`))
  .catch(error => console.error(`Error: ${error.message}`));
