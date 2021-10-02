const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "candies",
    description: "Shows users candies..",

    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;

        const candies = await client.candies(user.id);

        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL())
                .setThumbnail(user.displayAvatarURL())
                .setColor("ORANGE")
                .setDescription(`You have 🍬 \`${candies.toLocaleString()}\` candies!`)
            ]
        })
    }
}