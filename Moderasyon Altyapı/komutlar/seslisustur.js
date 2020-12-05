const Discord = require('discord.js');
const ms = require("ms");

module.exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK");

    message.channel.send(embed).then(x => x.delete(5000));
    return;
  }

let kullanici = message.mentions.members.first() || message.guild.members.get(args[0])
    if (!kullanici) return message.channel.send("Lütfen susturulacak kişiyi belirtiniz.")
  if(kullanici.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Benden yetkili birini susturamam.");
  if (kullanici.id === message.author.id) return message.channel.send("Kendinizi susturamazsınız.");
  
    let süre = args[1]
  if(!süre) return message.channel.send("Lütfen doğru bir zaman dilimi giriniz. Örneğin: ***!seslisustur @kişi 1s/m/h/d sebep**");
  let sebep = args[2]
  if (!sebep) return message.channel.send("Lütfen bir sebep giriniz. Örneğin: ***!seslisustur @kişi 1s/m/h/d sebep**");
  const kod = "```fix";
  const kod2 = "```";
  let embed =  new Discord.RichEmbed()
              .setTitle("Kullanıcı Ses Cezası Aldı")
                .setDescription(`
**Susturulan Üye:** ${kullanici}
**Susturan Yetkili:** ${message.author}

**Susturulma Sebebi:** ${kod}
${sebep} ${kod2}
**Verilen Süre:** ${kod}
${süre} ${kod2}`)       
              .setColor("RANDOM");
  kullanici.setMute(true, `Susturan yetkili: ${message.author.tag} - Susturma süresi: ${süre} ms`)
              .then(() => message.channel.send(` ${süre} süreliğine  ${message.author}  tarafından ${sebep} sebebiyle susturuldu!`)).catch(console.error);
    let onay = message.guild.channels.find(`name`, "KANAL LOG ADI")
  message.guild.channels.get(onay.id).send(embed)
  
        setTimeout(() => {
 kullanici.setMute(false,`Süresi dolduğu için susturması kaldırıldı.`)
          let sembed =  new Discord.RichEmbed()
              .setTitle("Kullanıcı Ses Cezası Kalktı")
                .setDescription(`
**Susturması Kalkan Üye:** ${kullanici}
**Susturan Yetkili:** ${message.author}

**Susturulma Sebebi:** ${kod}
${sebep} ${kod2}
**Dolan Süre:** ${kod}
${süre} ${kod2}`)  
                .setColor("RANDOM");
          let onay = message.guild.channels.find(`name`, "KANAL LOG ADI")
          message.guild.channels.get(onay.id).send(sembed)

    }, ms(süre))
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["sescezası", "sesli-sustur"],
    permLevel: 0
};

exports.help = {
    name: 'seslisustur',
    description: 'seslide sustur',
    usage: "seslisustur"
};