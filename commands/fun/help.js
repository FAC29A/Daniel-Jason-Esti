const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Shows a list of commands."),
    async execute (interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Commands list')
            .setDescription('A list of all commands and what they do.')
            .addFields(
                { name: '/help', value: 'Shows a list of all the bots commands.'},
                { name: '/ping', value: 'Makes the bot respond to you.'},
                { name: '/rps', value: 'Starts a game of Rock, Paper or Scissors with the bot.'},
                { name: '/user', value: 'Shows information about the user that ran the command.'},
                { name: '/translate', value: 'Tranlates a phrase into a desired language.'  }
            )        


        await interaction.reply({embeds: [helpEmbed]});
    },
};

