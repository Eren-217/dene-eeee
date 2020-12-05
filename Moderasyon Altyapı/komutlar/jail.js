const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');
const ms = require(`ms`);

exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
  let LoZUye = message.mentions.members.first() || message.guild.members.get(args[0]);
  if (!LoZUye) return message.reply(`Cezalıya atılacak üyeyi belirtmelisin!`).then(m => m.delete(5000));
  let cezaliRolu = "CEZALI ROL ID";
  const sure = args[1];
  if(!sure) return message.channel.send("Lütfen doğru bir zaman dilimi giriniz. Örneğin: ***!jail @kişi 1s/m/h/d sebep**");

  const sebeb = args.slice(2).join(' ')
  
    LoZUye.addRole(cezaliRolu);
    setTimeout(function(){
      LoZUye.removeRole(cezaliRolu);
      message.guild.channels.get(onay.id).send(log2);
    }, ms(sure))
    db.push(`ceza.${message.guild.id}`, `a${LoZUye.id}`);
    message.channel.send(`${LoZUye} Adlı üye başarıyla cezalıya atıldı!`).then(m => m.delete(5000));
    
  const kod = "```fix";
  const kod2 = "```";
  const log = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Kullanıcı Ceza Aldı!")
  .setDescription(`
**Jail Atılan Üye:** ${LoZUye}
**Jail Atan Yetkili:** ${message.author}

**Cezalıya Atılma Sebebi:** ${kod}
${sebeb}${kod2}
**Verilen Süreç:**${kod}
${sure}${kod2}
`)
  let onay = message.guild.channels.find(`name`, "KANAL LOG ADI")
  message.guild.channels.get(onay.id).send(log)
  
  const log2 = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Kullanıcının Cezası Bitti!")
  .setDescription(`
**Jail Biten Üye:** ${LoZUye}
**Jail Bitiren Yetkili:** ${message.author}

**Neden Ceza Almıştı:** ${kod}
${sebeb}${kod2}
**Dolan Süre:** ${kod}
${sure}${kod2}
`)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = { 
  name: 'jail', 
  description: 'Cezalıya atar.',
  usage: 'jail',
  kategori: 'kullanıcı'
};