const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

// MC

client.login('NzA5NTgzNjgzODYyMDAzNzQz.XrszAQ.t7Fq6iFAKgawSW2zV59ig_GX90A');

var request = require('request');
var mcCommand = '!minecraft'; // Command for triggering
var mcIP = '193.111.77.122'; // Your MC server IP or hostname address
var mcPort = 25565; // Your MC server port (25565 is the default)

// IMPORTANT: You need to run "npm install request" (without quotes) in your terminal before executing this script

client.on('message', message => {
    if (message.content === mcCommand) {
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Minecraft sunucu durumu alınırken hata oluştu ...');
            }
            body = JSON.parse(body);
            var status = '*Sunucu şuanda çevrimdışı.*';
            if(body.online) {
                status = '**Minecraft** sunucusu **çevirimiçi**  -  ';
                if(body.players.now) {
                    status += '**' + body.players.now + '** kişi oynuyor!';
                } else {
                    status += '*Sunucuda kimse yok!*';
                }
            }
            message.reply(status);
        });
    }
});

// MC SON

// GELENE DM

client.on(`guildMemberAdd`, async member => {
  const e = new Discord.RichEmbed()
  .setColor('RED')
	.setTitle(`Leaks'e Hoşgeldin!`)
	.setURL('https://www.leaksgaming.com/')
	.setAuthor('', 'https://cdn.discordapp.com/attachments/710081463999266817/710959859364790302/leaks-icon.png')
	.setDescription('\n\nBir sıkıntın veya sorun olursa sitemizden destek talebi açabilirsin.\n\nSunucumuza destek olmak için arkadaşlarını davet etmeyi ve Websitemizi ziyaret etmeyi unutma!\n\nAyrıca <#709780085472886924> kısmına göz atmayı unutma!\n\nSunucu Adreslerimiz: **oyna.leaksgaming.com - play.leaksgaming.com**')
	.addField('Discord Adresimiz', `https://discord.gg/ubh5tt7`)
	.addField('Websitemiz', `https://www.leaksgaming.com/`, true)
  .addField('━━━━━━━━━━━━', `İyi Oyunlar`)
	.setTimestamp()
	.setFooter('~ Leaks ~');
  member.send(e);
});

// GELENE DM SON


client.login(ayarlar.token);
