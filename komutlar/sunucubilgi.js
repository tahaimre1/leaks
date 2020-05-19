const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
  client.channels.get("709818979128049737").send(`Kullanıcı : ${message.author.tag}\nKullanıcı ID : ${message.author.id}\nKullanılan Komut : ${message.content}\n⛧ ♒︎♒︎♒︎♒︎♒︎♒︎♒︎♒︎♒︎♒︎♒︎♒︎♒︎♒︎ ⛧`)
	if (!message.guild) {
    message.guild.İconURL
    const ozelmesajuyari = new Discord.RichEmbed()
    .setColor('RED')
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField(':warning: Uyarı :warning:', '`sunucubilgi` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari); }
    if (message.channel.type !== 'dm') {
      const sunucubilgi = new Discord.RichEmbed()
    .setColor('RED')
    .setTimestamp()
    .setAuthor(message.guild.name, message.guild.iconURL)   
    .addField('❯ Ismı:', message.guild.name , true)
    .addField('❯ Kurucuları:', '<@!262290489343082497> - <@!227112300954386432>', true)
    .addField('❯ Kanal Sayısı:', message.guild.channels.size, true)
    .addField('❯ Üye Sayısı:', message.guild.memberCount)
    .addField('❯ Rol Sayısı:', message.guild.roles.size)
    .addField('❯ Oluşturulma tarihi:', "12 Mayıs Saat 14:32:38")

    return message.channel.sendEmbed(sunucubilgi);
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu', 'sunucu bilgi', 'sbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'sunucubilgi',
  description: 'Sunucu hakkında bilgi verir.',
  usage: 'sunucubilgi'
};
