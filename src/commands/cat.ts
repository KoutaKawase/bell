import { Command } from './types/Command';
import { catToken } from '../config.json';
import fetch, { Headers } from 'node-fetch';

const cat: Command = {
  name: 'cat',
  description: 'ランダムに猫ちゃんを楽しめる',
  args: false,
  execute: async (message) => {
    const url = await requestRandomCat();
    message.channel.send(url);
  },
};

const catApiURL = 'https://api.thecatapi.com/v1/images/search';
const meta = {
  'Content-Type': 'application/json',
  'x-api-key': catToken,
};
const headers = new Headers(meta);

async function requestRandomCat(): Promise<string> {
  const response = await fetch(catApiURL, { headers });
  const json = await response.json();
  const url = json[0].url;
  return url as string;
}

export { cat as command };
