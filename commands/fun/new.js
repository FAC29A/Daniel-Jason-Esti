const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("Hello in Hebrew")
    .setDescription("Replies with שלום!"),
  async execute(interaction) {
    await interaction.reply("!שלום");
  },
};