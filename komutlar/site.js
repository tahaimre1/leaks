const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
  if (message.channel.type !== 'dm') {
    const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor('RED')
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription('Websitemiz: https://www.leaksgaming.com/');
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['website'],
  permLevel: 0
};

exports.help = {
  name: 'site',
  description: 'Yapimcimi Gosterir.',
  usage: 'yapimcim'
};