const { SlashCommandBuilder } = require("discord.js");

// Language
const tracery = require('tracery-grammar');
const grammar = require('./language/grammarUser.js');
const nlp = require('compromise');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("user")
		.setDescription("Shows user information."),
	async execute(interaction) {
		const outputPossible = tracery.createGrammar(grammar.user);
		const outputChoose1 = outputPossible.flatten('#phraseUser#');
		const outputChoose2 = outputPossible.flatten('#phraseJoined#');
		await interaction.reply(
			`${outputChoose1} ${interaction.user.username} ${outputChoose2} ${interaction.member.joinedAt}`
		);
	},
};