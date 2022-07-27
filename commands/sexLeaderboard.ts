import { SlashCommandBuilder } from "@discordjs/builders";
import { SlashCommand } from "../SlashCommand";
import { MessageEmbed } from "discord.js";
import { getSexCountAll } from "../sexDatabase";

export const command: SlashCommand = {
	native: new SlashCommandBuilder()
		.setName("sex-leaderboard")
		.setDescription("Cine a făcut cel mai mult!!")
		.toJSON(),
	callback: async (interaction) => {
		const all = await getSexCountAll();
		const sorted = Object.keys(all).sort(function(a, b) { return all[b] - all[a] }).slice(0, 10)
		const embed = new MessageEmbed()
			.setTitle("Cei mai sexoși")
			.setColor("RANDOM")
			.addField("Pereche", sorted.map((p, i) => {
				const split = p.split("_");
				if (split[0] === split[1]) return `${i + 1}. <@${split[0]}> singur/ă`;
				else return `${i + 1}. ` + split.map(u => `<@${u}>`).join(" cu ")
			}).join("\n"), true)
			.addField("Sexuri", sorted.map((k) => all[k]).join("\n"), true)
		await interaction.reply({ embeds: [embed] });
	}
}
// iti urez un ok cand vezi asta