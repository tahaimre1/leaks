const Discord = require("discord.js");
const moment = require("moment");
const colors = require("colors");
var green = process.env.NODE_DISABLE_COLORS ? '' : '\x1b[32m';

require("moment-duration-format");

exports.run = (client, msg) => {
  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
  msg.channel.sendCode("asciidoc", `Leaks Minecraft - Bot Komutları Menüsü

•    Kullanıcı Komutları     •

• istatistik      :: > Bot istatigini gosterır.
• kullanıcıbilgi  :: > Kullanıcı bilgini gosterir.
• sunucubilgi     :: > Sunucu bilgisini gosterir.
• yardım          :: > Tüm komutları listeler.
• ping            :: > Botun pingini gösterir.
• basvuru         :: > Basvuru yaparsınız. (Kullanıma Kapalı!)

•    Moderasyon Komutları     •

• ban             :: > İstediğiniz kişiyi sunucudan yasaklar.
• unban           :: > İstediğiniz kişinin yasaklamasını kaldırırsınız.
• uyar            :: > İstenen kişiye uyarı verirsiniz.
• kick            :: > İstediğiniz kişiyi sunucudan atar.
• temizle         :: > Mesajları siler.


Not :: Botumuza eklenmesini istediğiniz komutlar sohbet kanalından bildiriniz.`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları listeler. İsterseniz bir komut hakkında yardım eder..',
  usage: 'komutlar2'
};