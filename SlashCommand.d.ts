import type { Client, CommandInteraction } from "discord.js";

export interface SlashCommand {
  native: any;
  callback: (interaction: CommandInteraction, client: Client) => Promise<any>;
};
