const translate = require("google-translate-api");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("translate")
    .setDescription("Translate text to another language")
    .addStringOption((option) =>
      option.setName("text").setDescription("Enter text to translate").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("language").setDescription("Enter target language code").setRequired(true)
    ),
  async execute(interaction) {
    const textToTranslate = interaction.options.getString("text");
    const targetLanguage = interaction.options.getString("language");

    try {
      const translation = await translate(textToTranslate, { to: targetLanguage });
      await interaction.reply(`Translated: ${translation.text}`);
    } catch (error) {
      console.error(error);
      await interaction.reply("Translation failed. Please try again.");
    }
  },
};
