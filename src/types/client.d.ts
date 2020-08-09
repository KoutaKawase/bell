import { Client, Collection } from 'discord.js';
import { Command } from '../commands/types/Command';

declare module 'discord.js' {
  interface Client {
    commands: Collection<string, Command>;
  }
}
