import Discord from 'discord.js';
import { Command } from './commands/types/Command';
import { prefix, token } from './config.json';
import { readdirSync } from 'fs';

const client = new Discord.Client();
client.commands = new Discord.Collection<string, Command>();
const commandFiles = readdirSync('./commands').filter((file) =>
  file.endsWith('.js')
);

for (const file of commandFiles) {
  (async () => {
    const { command } = await import(`./commands/${file}`);
    client.commands.set(command.name, command);
  })();
}

client.login(token);

client.once('ready', () => {
  console.log('Logged in.');
});

client.on('message', onMessage);

function onMessage(message: Discord.Message): void {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift()?.toLowerCase() as string;

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName) as Command;

  if (command.args && !args.length) {
    message.channel.send(
      `オプションが指定されてないニャンね, ${message.author}さん😹`
    );
    return;
  }

  try {
    command?.execute(message, args);
  } catch (err) {
    console.error(err);
    message.reply(
      'Oops! コマンド実行しようとしたけどエラーが発生したニャンね😹'
    );
  }
}
