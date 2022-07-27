import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client, Intents } from "discord.js";
import fs from "fs";
import path from "path";
import { SlashCommand } from "./SlashCommand";

let commands: Record<string, SlashCommand> = {};

const rest = new REST({
	version: "9",
}).setToken(process.env.DISCORD_BOT_TOKEN!);

export const refreshSlashCommands = async () => {
	commands = {};
	const commandsFolderPath = path.join(__dirname, "commands");

	fs.readdirSync(commandsFolderPath)
		.filter((file) => file.endsWith(".js"))
		.forEach((file) => {
			const command: SlashCommand = require(path.join(
				commandsFolderPath,
				file
			)).command;
			commands[command.native.name] = command;
		});

	try	{ 
		rest.put(
			Routes.applicationGuildCommands(
				process.env.DISCORD_APPLICATION_ID! as `${bigint}`,
				"839520481475952650"
			),
			{ body: Object.values(commands).map((command) => command.native) }
		);
	} catch {}
	try	{ 
		rest.put(
			Routes.applicationGuildCommands(
				process.env.DISCORD_APPLICATION_ID! as `${bigint}`,
				"455748680452931595"
			),
			{ body: Object.values(commands).map((command) => command.native) }
		);
	} catch {}
	console.log("Refreshed (/)");
};

const client = new Client({
	intents: [Intents.FLAGS.GUILDS],
});

client.on("ready", async () => {
	console.log(`Logged in as ${client.user!.tag}`);

	client.user!.setActivity({
		name: "olimpiada de futut",
		type: "COMPETING",
	});
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;
	const command = commands[interaction.commandName];
	if (!command) interaction.reply("Oops");
	await command!.callback(interaction, client);
});

refreshSlashCommands();

client.login(process.env.DISCORD_BOT_TOKEN!);
