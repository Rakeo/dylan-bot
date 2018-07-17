//const Discord = require('discord.js');
//const client = new Discord.Client();
 

//ping test command "testping"
//client.on('message', message => {
  //if (message.content === 'testping') {
    //message.reply('testpong');
  //}
//});

//------------------------------------------------------------------------------


const Discord = require('discord.js');
const client = new Discord.Client();

// config load
const config = require("./config.json");

// date dont touch
var Variable = new Date()


const talkedRecently = new Set();

client.on("ready", () => {
  // bot game updater 
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setGame(`Im On ${client.guilds.size} Servers`);
});

// displays console second ready check
client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', message => { 
  if (message.content === "!bot"){ 
      message.author.sendMessage("UP AND RUNNING!"); 
  }
});

// triggers console log on new server join
client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

// console log on server leave or kick
client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

// ignore

//client.on('message', function(message) {
//        if (message.channel.isPrivate) {
//              console.log(`(Private) ${message.author.name}: ${message.content}`);
//       } else {
//              console.log(`(${message.server.name} / ${message.channel.name}) ${message.author.name}: ${message.content}`);
//      }
//;


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
    
  if (talkedRecently.has(message.author.id))
  return;
    
talkedRecently.add(message.author.id);
setTimeout(() => {
  
  talkedRecently.delete(message.author.id);
}, 5000);
    

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'welcomes');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}`);
});

    const swearWords = ["fuck", "nigger", "shit", "ass", "nigga", "dick", "faggot", "fag"];
if( swearWords.some(word => message.content.includes(word)) ) {
  message.reply("Oh no you said a bad word!!!");
}
    
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(command === "ping") {

    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
    
  if(command === "kappatest") {
    // kappa command
      const m = await client.sendFile(message, 'http://i.imgur.com/6CbxaPc.jpg', 'kappa.jpg', 'Check out this cool file!',)
  }

var kappa = ["http://i.imgur.com/6CbxaPc.jpg"];

if(command === "nicekappa") {channel.send({
  files: ['http://i.imgur.com/6CbxaPc.jpg']
})
  .then(console.log)
  .catch(console.error);
}
client.on("message", function(msg){
    if (msg.content == "!kappa") {
        var num = RandomNum(0, kappa.length - 1);
        msg.reply(kappa[num])
    }
})

function RandomNum(min, max){
    Math.random(); Math.random(); Math.random();
    var num = Math.random() * (max - min) + min;
    return Math.floor(num);
}
    
  if(command === "help") {

    const m = await message.reply("```The Help Forum! Commands: LINKBROKENEEDSFIXING```");
  }
  
  if(command === "say") {

    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{}); 

    message.channel.send(sayMessage);
  }

  if(command === "saycode") {

    const sayMessage = args.join(" ");

    message.delete().catch(O_o=>{}); 

    message.channel.sendCode(sayMessage);
  }

  if(command === "idle") {
    if(!message.member.roles.some(r=>["Admin","Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    bot.user.setStatus("idle").then(console.log).catch(console.error);

    const m = await message.channel.send()
  }
  
  if (command === "online"){

    if(!message.member.roles.some(r=>["Admin","Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    bot.user.setStatus("online").then(console.log).catch(console.error);
    //
    const m = await message.channel.send(`Bot has been set to online by ${message.author.username}\nID: ${message.author.id}`)

    
  }
  if (command === `user-info`) {
    message.reply(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nUser Avatar:${user.avatarURL} `);
}

if (command === "avatar") {

  message.reply('This shit broke');
}

  // send the entire array of strings as a message
    // by default, discord.js will `.join()` the array with `\n`
    message.channel.send(avatarList);


  if(command === "kick") {

    if(!message.member.roles.some(r=>["Owner", "Officer", "Admin", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
 
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the kick!");
    

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {

    if(!message.member.roles.some(r=>["Admin","Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {

    
    if(!message.member.roles.some(r=>["Admin","Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");

    const deleteCount = parseInt(args[0], 10);
    

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    

    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  if(command === "welcometitle"){
  message.channel.send({
    embed: {
        color: 0x0099ff,
        title: 'Welcome To Dylan Party',
        url: 'https://discord.gg/MpBDADg',
        author: {
            name: 'Dylan',
            icon_url: 'http://i.imgur.com/6CbxaPc.jpg',
            url: 'Dylan#0356',
        },
        description: 'Bot Used For Testing "Dylan Bot"',
        thumbnail: {
            url: 'http://i.imgur.com/6CbxaPc.jpg',
        },
        fields: [
            {
                name: 'About Bot',
                value: 'ERROR',
            },
            {
                name: '\u200b',
                value: '\u200b',
            },
            {
                name: 'About Dylan Party',
                value: 'The Dylan Party is an old discord server initally used for a group of friends to connect while playing games.This server has moved on from that and is now mainly used as a forum for help with Dylan Bot and testing on Dylan Bot',
                inline: true,
            },
            {
                name: 'WIP',
                value: 'ERROR',
                inline: true,
            },
            {
                name: 'WIP',
                value: 'ERROR',
                inline: true,
            },
        ],
        image: {
            url: 'http://i.imgur.com/6CbxaPc.jpg',
        },
        timestamp: new Date(),
        footer: {
            text: 'All images are being replaced soon',
            icon_url: 'http://i.imgur.com/6CbxaPc.jpg',
        },
    },
});
}
});





 client.login('NDY2MzI5NTc0MTUwNjM1NTIw.Diae1A.ZwcF1ebOKEqdXwl8TrEB4p9-xhg');