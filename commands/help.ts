import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../SlashCommand";
import { MessageEmbed } from "discord.js";

export const command: SlashCommand = {
	native: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Află informații despre acest bot.")
		.toJSON(),
	callback: async (interaction) => {
		
		
		const embed = new MessageEmbed()
			.setTitle("Informații")
			.setColor("RANDOM")
			.setDescription("Vezi codul sursă: https://replit.com/@tacheometry/OKPR-Discord\nProgramat de <@206377170707152906> și <@266258848124239873>")
		await interaction.reply({ embeds: [embed] });
	}
}
