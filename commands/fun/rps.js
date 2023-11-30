const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
} = require("discord.js");

// Language
const tracery = require('tracery-grammar');
const grammar = require('../../language/grammarRps.js');
const nlp = require('compromise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription(" Starts a Rock, Paper or Scisors game."),
  async execute(interaction) {
    const rockButton = new ButtonBuilder()
      .setLabel("👊")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("rock-button");

    const paperButton = new ButtonBuilder()
      .setLabel("🖐️")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("paper-button");

    const scissorsButton = new ButtonBuilder()
      .setLabel("✌️")
      .setStyle(ButtonStyle.Primary)
      .setCustomId("scissors-button");

    const actionRow = new ActionRowBuilder().addComponents(
      rockButton,
      paperButton,
      scissorsButton
    );

    const game = await interaction.reply({
      content: `You have challenged the bot to Rock, Paper or Scissors!`,
      components: [actionRow],
      ephemeral: true,
    });

    const collector = game.createMessageComponentCollector({
      ComponentType: ComponentType.Button,
    });

    collector.on("collect", async (i) => {
      let result;
      if (i.customId === "rock-button") {
        result = botRPS("rock");
      } else if (i.customId === "paper-button") {
        result = botRPS("paper");
      } else {
        result = botRPS("scissors");
      }

      await i.deferUpdate();
      await i.editReply(result);

      actionRow.components.forEach((button) => button.setDisabled(true));
      i.editReply({ content: i.content, components: [actionRow] });
    });

    function botRPS(playerChoice, player) {
      const options = ["rock", "paper", "scissors"];

      const botChoice = options[Math.floor(Math.random() * 3)];

      switch (playerChoice) {
        case "rock":
          if (botChoice === "rock") {
            return "It's a tie!";
          } else if (botChoice === "paper") {
            return "Bot wins!";
          } else {
            return "You win!";
          }
          break;
        case "paper":
          if (botChoice === "rock") {
            return "You win!";
          } else if (botChoice === "paper") {
            return "It's a tie!";
          } else {
            return "Bot wins!";
          }
          break;
        case "scissors":
          if (botChoice === "rock") {
            return "Bot wins!";
          } else if (botChoice === "paper") {
            return "You win!";
          } else {
            return "It's a tie!";
          }
          break;
        default:
          return "Invalid choice. Please choose rock, paper, or scissors.";
      }
    }
  },
};
