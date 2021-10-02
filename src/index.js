const { Collection, Client, Discord } = require('discord.js');
const client = new Client({
    intents: 32767,
});
const path = require('path')
const fs = require('fs')
const config = require('./config.json');
const mongoose = require('mongoose');
const Schema = require('./schema');
module.exports = client;

client.commands = new Collection();
client.prefix = config.prefix;
client.aliases = new Collection();
client.categories = fs.readdirSync(path.resolve('src/commands'));

["command"].forEach(handler => {
    require(path.resolve(`src/handlers/${handler}`))(client);
}); 

mongoose.connect(config.mongooseConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected.')).catch((err) => console.log('Database Dissconnected..'));


/* Candie System */

client.candies = (id) => new Promise(async ful => {
    const data = await Schema.findOne({ id });

    if(!data) return ful(0);
    return ful(data.candies);
})

client.add = async(id, amount) => {
    Schema.findOne({ id: id }, async(err, data) => {
        if(data) {
            data.candies += amount;
            data.save();
        } else {
            data = new Schema({
                id: id,
                candies: amount
            }).save();
        }
    })

};

client.remove = async(id, amount) => {
 Schema.findOne({ id: id }, async(err, data) => {
    if(data) {
        data.candies -= amount;
        data.save();
    } else {
        data = new Schema({
            id: id,
            candies: amount
        }).save();
    }
 })
}

client.login(config.token);