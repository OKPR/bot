import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../SlashCommand";
import { MessageEmbed } from "discord.js";

export const command: SlashCommand = {
	native: new SlashCommandBuilder()
		.setName("buci-messi")
		.setDescription("Bucile lui Messi")
		.toJSON(),
	callback: async (interaction) => {
		await interaction.reply("https://media.discordapp.net/attachments/839574593009352745/975802946556157982/mingile_lui_messi.png");
	}
}
