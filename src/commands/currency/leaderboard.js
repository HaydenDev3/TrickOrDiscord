const { Client, Message, MessageEmbed, Collection } = require('discord.js');

module.exports = {
    name: 'leaderboard',
    category: 'Candie Currency',
    description: "See the server leaderboard..",
    aliases: ['lb', 'leader-board'],

    /** 
    * @param {Client} client 
    * @param {Message} message 
    * @param {String[]} args 
    */

    run: async(client, message, args) => { 
        const collection = new Collection();

        await Promise.all(
            message.guild.members.cache.map(async(member) => {
                const id = member.id;
                const candies = await client.candies(id);
                return candies !== 0 ? collection.set(id, {
                    id,
                    candies
                }) : null
            })
        );

        const data = collection.sort((a, b) => b.candies - a.candies).first(10);

        message.channel.send({
            embeds: [
                new MessageEmbed()
                .setTitle(`Leaderboard in ${message.guild.name}`)
                .setColor("BLURPLE")
                .setDescription(
                    `${data.map((v, i) => {
                        return `**${i+1}.** ${client.users.cache.get(v.id).tag} (${client.users.cache.get(v.id)}) • ${v.candies.toLocaleString()} candies`
                    })}`
                )
            ]
        })
    }
};