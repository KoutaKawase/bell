import { Command } from './types/Command';

const argsInfo: Command = {
  name: 'args-info',
  description: 'args-ingo',
  args: true,
  execute(message, args) {
    if (args[0] === 'foo') {
      message.channel.send('bar');
      return;
    }

    message.channel.send(
      `Arguments: ${args}\nArguments length: ${args.length}`
    );
  },
};

export { argsInfo as command };
