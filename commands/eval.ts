import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../SlashCommand";
import { MessageEmbed } from "discord.js";

export const command: SlashCommand = {
	native: new SlashCommandBuilder()
		.setName("eval")
		.setDescription("Admin")
		.addStringOption((option) => option.setName("text").setDescription("^").setRequired(true))
		.toJSON(),
	callback: async (interaction) => {
		if (interaction.user.id !== "206377170707152906") return interaction.reply({
			ephemeral: true,
			content: "Nu"
		});
		const text = interaction.options.getString("text", true);
		let output;
		try {
			output = eval(text);
		} catch(e) {
			output = e;
		}
		interaction.reply({
			ephemeral: true,
			content: `\`${output}\``
		});
	}
}
