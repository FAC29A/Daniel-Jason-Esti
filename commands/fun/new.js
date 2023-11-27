const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("Hello")
    .setDescription("Replies with שלום!"),
  async execute(interaction) {
    await interaction.reply("!שלום");
  },
};
