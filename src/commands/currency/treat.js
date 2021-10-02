const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: "trick-or-treat",
    description: "Go trick or treating...",
    aliases: ['trickortreat', 'trt'],
    cooldown: 60000,

    run: async(client, message, args) => {
        const messages = ['You went trickortreating at the Haunted Manor house.', 'You trick or treated at a Abandoned Asylum', 'You went trick or treating at the Creepy Castle', 'You went trick or treating in the spooky hollows', 'You decided to go trick or treating at the Scream Park', 'You went trick or treating at the Raven’s Castle', 'You went trick or treating in The Twisted Woods', 'You trick or treated in the Ghost Town'];

        const msg = Math.floor(Math.random() * messages.length);

        const candies = Math.floor(Math.random() * 50) + 100;

        client.add(message.author.id, candies);
        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setColor("GREEN")
                .setDescription(`${messages[msg]} and got :candy: ${candies.toLocaleString()} candies!`)
            ]
        })
    }
}