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
    .setDescription("Starts a Rock, Paper or Scisors game."),
  
	//buttons
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
		
		//Create Lexicon
		const lexicon = tracery.createGrammar(grammar.rps);

		//Challenge Message
		const lexChallenge = lexicon.flatten('#challenge#');
    const game = await interaction.reply({
      content: `${lexChallenge}`,
      components: [actionRow],
      ephemeral: true,
    });

    const collector = game.createMessageComponentCollector({
      ComponentType: ComponentType.Button,
    });

		//Record Player Move
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
      await i.editReply(result);

      actionRow.components.forEach((button) => button.setDisabled(true));
      i.editReply({
				content: i.content,
				components: [actionRow]
			});
    });
		
		//Execute Game
    function botRPS(playerChoice, player) {
			let message = "You chose ";
			message += lexicon.flatten(`#${playerChoice}#`);
			message += "... "

      const options = ["rock", "paper", "scissors"];
			message += "Meanwhile, the bot has chosen ";
      const botChoice = options[Math.floor(Math.random() * 3)];
			message += lexicon.flatten(`#${botChoice}`);

			//Game Result
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
			message += (" " + lexicon.flatten(`#${result}`));
			return message;
    }
  },
};

/* 
const lexicon = tracery.createGrammar(grammar.rps);
const NAME = lexicon.flatten('#SYMBOL#');
*/