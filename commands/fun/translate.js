const { SlashCommandBuilder } = require("discord.js");
const MsTranslator = require("mstranslator");
const { apikey } = require("../../config.json");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translate text to another language")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("Enter text to translate")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("language")
        .setDescription("Enter target language code")
        .setRequired(true)
    ),
  async execute(interaction) {
    const textToTranslate = interaction.options.getString("text");
    const targetLanguage = interaction.options.getString("language");

    const client = new MsTranslator({
      api_key: apikey, // Replace with your actual API key
    });

    client.translate(
      {
        text: textToTranslate,
        to: targetLanguage,
      },
      (err, translation) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Original: ${textToTranslate}`);
          console.log(`Translation: ${translation}`);
        }
      }
    );
  },
};
