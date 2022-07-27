import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../SlashCommand";
import { MessageEmbed } from "discord.js";

export const command: SlashCommand = {
	native: new SlashCommandBuilder()
		.setName("iasi")
		.setDescription("Iași")
		.toJSON(),
	callback: async (interaction) => {
		await interaction.reply("https://tenor.com/view/iasi-gif-20609588");
	}
}
