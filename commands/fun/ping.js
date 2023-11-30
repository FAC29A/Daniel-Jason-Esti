const { SlashCommandBuilder } = require("discord.js");

// Language
const tracery = require('tracery-grammar');
const grammar = require('./language/grammarPing.js');
const nlp = require('compromise');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute (interaction) {
        await interaction.reply("Pong!");
    },
};