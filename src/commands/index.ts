/**
 * Slash commands registry.
 */

import type { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import * as challenge from './challenge.js';
import * as classement from './classement.js';

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export const commands: Command[] = [
  { data: challenge.data, execute: challenge.execute },
  { data: classement.data, execute: classement.execute },
];

export function getCommand(name: string): Command | undefined {
  return commands.find((c) => c.data.name === name);
}
