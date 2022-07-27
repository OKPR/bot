import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../SlashCommand";
import { MessageEmbed } from "discord.js";
import { getSexCount, setSexCount } from "../sexDatabase";

export const command: SlashCommand = {
	native: new SlashCommandBuilder()
		.setName("sex")
		.setDescription("Sex!!!!")
		.addUserOption((option) => option.setName("sexuit").setDescription("Cine vrei").setRequired(false))
		.toJSON(),
	callback: async (interaction) => {
		const author = interaction.member!.user;
		const sexuit = interaction.options.getUser("sexuit") ?? author;
		const users = [author.id, sexuit.id] as [string, string];
		const sexAmount = (await getSexCount(users)) + 1;
		await setSexCount(users, sexAmount);

		const extraText = sexAmount === 1 ? "prima oară" : `a **${sexAmount}**-a oară`;

		if (sexuit !== author) {
			await interaction.reply(`${interaction.member!} face sex cu ${sexuit.id === interaction.client.user!.id ? "mine" : sexuit } (${extraText}!)`);
		} else {
			return await interaction.reply(`Faci sex singur... ${extraText}...`);
		}
	}
}
