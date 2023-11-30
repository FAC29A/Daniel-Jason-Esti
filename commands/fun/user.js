const { SlashCommandBuilder } = require("discord.js");

// Language
const tracery = require('tracery-grammar');
const grammar = require('./language/grammar.js');
const nlp = require('compromise');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Shows user information."),
    async execute(interaction) {
        await interaction.reply(`This command was run by ${interaction.user.username} who joined on ${interaction.member.joinedAt}. `);
    },
};