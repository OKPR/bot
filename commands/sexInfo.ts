import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../SlashCommand";
import { MessageEmbed } from "discord.js";
import { getIndividualSexCount } from "../sexDatabase";

export const command: SlashCommand = {
	native: new SlashCommandBuilder()
		.setName("sex-info")
		.setDescription("Află cât sex ai făcut și altele")
		.addUserOption((option) => option.setName("sexuit").setDescription("Cine vrei").setRequired(false))
		.toJSON(),
	callback: async (interaction) => {
		const user = interaction.options.getUser("sexuit", false) ?? interaction.user;
		const counts = (await getIndividualSexCount(user.id)).sexedWith;
		const sorted = Object.keys(counts).sort(function(a, b) { return counts[b] - counts[a] }).slice(0, 10)
		const totalSex = Object.values(counts).length > 0 ? (Object.values(counts) as number[]).reduce((a, b) => a + b) : 0;

		const topSexatText = sorted[0] ? `<@${sorted[0]}> (**${counts[sorted[0]]}** ori)` : "*Nimeni!*";
		const totalSexText = totalSex === 1 ? "o dată" : `de **${totalSex}** ori`;

		const embed = new MessageEmbed()
			.setAuthor({
				name: user.username,
				iconURL: user.avatarURL() ?? undefined
			})
			.setColor("RANDOM")
			.addField('A sexat cel mai mult cu', topSexatText)
			.addField("În total", totalSexText);

		await interaction.reply({ embeds: [embed] });
	}
}
