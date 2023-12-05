const apiKey = "CiA5CJYu0d7lRSrteot5T3BlbkFJnD5QpQLbZMkh43J06vbX";
const sourceText =
  "Please translate this exact phrase into Hebrew. making sure you keep the same tone & nuance as the original message";
const { SlashCommandBuilder } = require("discord.js");
const { MsTranslator } = require("mstranslator");
const apiUrl = "https://api.example.com/translate";

async function translateText(apiKey, text) {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      text,
      targetLanguage: "he",
    }),
  });

  if (!response.ok) {
    throw new Error(`Translation failed with status: ${response.status}`);
  }

  const result = await response.json();
  return result[0].translations[0].text;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ai-translate")
    .setDescription("Translate text to Hebrew")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Enter text to translate")
        .setRequired(true)
    ),
  async execute(interaction) {
    const textToTranslate = interaction.options.getString("text");

    const client = new MsTranslator({
      api_key: apiKey,
    });

    const translatedText = await translateText(apiKey, textToTranslate);
    console.log(`Translated Text: ${translatedText}`);
  },
};
