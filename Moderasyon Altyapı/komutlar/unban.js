const Discord = require('discord.js');

exports.run = async(client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('Bu komutu kullanabilmek için "Üyeleri Yasakla" iznine sahip olmalısın!')
  if(!args[0]) return message.reply('Kaldırılacak banlı kullanıcının IDsini girmelisin. (Tüm banları kaldırmak için toplu yazmalısın)')
    if(args[0] === "toplu") {
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply('Bu özelliği kullanabilmek için "Yönetici" iznine sahip olmalısın!')
        message.guild.fetchBans().then(bans => {
          bans.forEach(user => {
            message.guild.unban(user)
          });
        });
        message.channel.send(`**Sunucudaki banların tümü başarıyla kaldırılıyor...**`)
      return
    }
    if(isNaN(args[0])) return message.reply('Banı kaldırılacak kullanıcının ID numarasını girmelisin!').then(x => x.delete(5000))
    try {
      message.guild.unban(args[0])
      let x = args[0];
      
      let log = message.guild.channels.find(`name`, "KANAL LOG ADI");      
      client.fetchUser(args[0]).then(x => log.send(new Discord.RichEmbed().setAuthor('Ban Kaldırıldı').setTimestamp().setColor("GREEN").setFooter(message.guild.name, message.guild.iconURL).setDescription(`**Banı Kaldırılan:** <@${x.id}> | ${x.id} \n**Banı Kaldıran:** ${message.author} | ${message.author.id}`)))
    } catch(err) { message.reply('Belirtilen ID numarasının banı kaldırılamadı!').then(x => x.delete(5000)) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['un-ban', 'ban-kaldır'],
  permLevel: 0,
};

exports.help = {
  name: 'unban',
  description: 'Sunucudan ban kaldırmanızı sağlar.',
  usage: 'unban id/toplu',
};