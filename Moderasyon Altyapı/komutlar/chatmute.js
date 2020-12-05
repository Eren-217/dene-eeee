const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
    const embed = new Discord.RichEmbed()
      .setDescription("```Ne yazık ki bu komutu kullanmaya yetkin yok.```")
      .setColor("BLACK");

    message.channel.send(embed);
    return;
  }
 let lozÜye = message.mentions.members.first() || message.guild.members.get(args[0])
  if(!lozÜye) return message.channel.send("Lütfen susturulacak kişiyi etiketleyiniz.");
  if(lozÜye.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Benden yetkili birini susturamam.");
  if (lozÜye.id === message.author.id) return message.channel.send("Kendinizi susturamazsınız.");
  let lozRol = message.guild.roles.find(`name`, "Susturuldu");

  if(!lozRol){
    try{
      lozRol = await message.guild.createRole({
        name: "Susturuldu",
        color: "#666666",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(lozRol, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let lozZaman = args[1];
  if(!lozZaman) return message.channel.send("Lütfen doğru bir zaman dilimi giriniz. Örneğin: ***!sustur @kişi 1s/m/h/d sebep**");
  let sebep = args[2]
  if(!sebep) return message.channel.send("Lütfen bir sebep giriniz. Örneğin: ***!sustur @kişi 1s/m/h/d sebep**");

  await(lozÜye.addRole(lozRol.id));
  const kod = "```fix";
  const kod2 = "```";
   let embed = new Discord.RichEmbed()
              .setTitle("Kullanıcı Chat Cezası Aldı")
                .setDescription(`
**Susturulan Üye:** ${lozÜye}
**Susturan Yetkili:** ${message.author}

**Susturulma Sebebi:** ${kod}
${sebep} ${kod2}
**Verilen Süre:** ${kod}
${lozZaman} ${kod2}`)
                .setColor("RANDOM");
  message.channel.send(`${message.author} Başarılı Bir Şekilde ${lozÜye} Susturuldu.`);
  let onay = message.guild.channels.find(`name`, "KANAL LOG ADI")
  message.guild.channels.get(onay.id).send(embed)
  
  setTimeout(function(){
    lozÜye.removeRole(lozRol.id);
    let sembed =  new Discord.RichEmbed()
              .setTitle("Kullanıcı Chat Cezası Kalktı")
                .setDescription(`
**Susturulması Kalkan Üye:** ${lozÜye}
**Susturulmasını Kaldıran Yetkili:** ${message.author}

**Susturulma Sebebi:** ${kod}
${sebep} ${kod2}
**Dolan Süre:** ${kod}
${lozZaman} ${kod2}`)
                .setColor("RANDOM");
  let onay = message.guild.channels.find(`name`, "KANAL LOG ADI")
  message.guild.channels.get(onay.id).send(sembed)
  }, ms(lozZaman));

  message.delete();

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["chat-mute","süreli-sustur"],
    permLevel: 0
};

exports.help = {
    name: 'sustur',
    description: 'sustur',
    usage: 'sustur'
};