// Import Discord
const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ComponentType,
} = require("discord.js");

// Import Language
const tracery = require('tracery-grammar');
const grammar = require('../../language/grammarRps.js');
const nlp = require('compromise');

// Import OpenAI

// Slash Command
module.exports = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Starts a Rock, Paper or Scisors game."),
  
	async execute(interaction) {
		// Create Buttons
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

		// Create Button Bar
    const actionRow = new ActionRowBuilder().addComponents(
      rockButton,
      paperButton,
      scissorsButton
    );
		
		// Create Lexicon
		const lexicon = tracery.createGrammar(grammar.rps);

		// Create Challenge Message & Bot Persona
		await interaction.defer();

		const lexChallenge = lexicon.flatten('#challenge#');
		const lexPersona = lexicon.flatten('#persona#');
		
    const game = await interaction.reply({
      content: `${lexChallenge} This bot seems a bit ${lexPersona}.`,
      components: [actionRow],
      ephemeral: true,
    });

		//Record Player Move
    const collector = game.createMessageComponentCollector({
      ComponentType: ComponentType.Button,
    });
    collector.on("collect", async (i) => {
      let result;
			const playerChose = "";
      if (i.customId === "rock-button") {
				playerChose = "rock";
      } else if (i.customId === "paper-button") {
				playerChose = "paper";
      } else {
				playerChose = "scissor";
      };
			result = botRPS(`${playerChose}`);

      await i.deferUpdate();
      await i.editReply(gameData.story);

      actionRow.components.forEach((button) => button.setDisabled(true));
      i.editReply({
				content: i.content,
				components: [actionRow]
			});
    });
		
		//Run Game
    function botRPS(playerChoice, player) {
			let message;
			// Flavour for Player Choice
			const lexChosePlayer = lexicon.flatten(`#${playerChoice}#`);

			// Define Bot's Options
      const options = ["rock", "paper", "scissors"];
      const botChoice = options[Math.floor(Math.random() * 3)];
			// Flavour for Bot's Choice
			const lexChoseBot = lexicon.flatten(`#${botChoice}`);
			message += "";

			//Define Result
			let result = "";
      switch (playerChoice) {
        case "rock":
          botChoice === "rock" ?
            result = "resultTie" :
          	botChoice === "paper" ?
							result = "resultBot" :
							result = "resultPlayer";
          break;
        case "paper":
          botChoice === "rock" ?
            result = "resultPlayer" :
          	botChoice === "paper" ?
            	result = "resultTie" :
          		result = "resultBot";
          break;
        case "scissors":
          botChoice === "rock" ?
						result = "resultBot" : 
						botChoice === "paper"?
							result = "resultPlayer" : 
							result = "resultTie";
          break;
        default:
          return "Invalid choice. Please choose rock, paper, or scissors.";
      }
			// Flavour the Result
			const lexResult = lexicon.flatten(`#${result}`);

			// Build & Return the Message
			message = `
				You chose ${lexChosePlayer}.
				The bot chose ${lexChoseBot}.
				A mighty battle ensued!
				Your ${lexChosePlayer} ${lexResult} ${lexChoseBot}
			`
			let gameData = {
				story: message,
				result: result
			}

			return gameData;
    }
  },
};
