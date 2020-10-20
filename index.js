// Initialise bot
const Discord = require('discord.js');
const client = new Discord.Client();

// Initialise firebase database
// firebase is used so I can keep track of how many servers have my bot
const admin = require('firebase-admin');
const { createGuildData } = require('./createGuildData.js');

admin.initializeApp({
    credential: admin.credential.cert({
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "project_id": process.env.PROJECT_ID
    }),
    databaseURL: process.env.DATABASE_URL
});

const db = admin.firestore();

client.on('guildCreate', async gData => {
    createGuildData(db, gData);
});

client.once('ready', () => {
    console.log('Ready!');
});

// Reply limit to a single message
const responseLimit = 3;

// HEY YOU! add your own custom words here ->
var words = {
    "cum": "cum?? CUM????? WHAT DID YOU SAY O MHLOWIJTKH UJIJHI thzlaoijh iuBIHJ UHVGIY UYG RESGY TRSTLIEhiTHIuRSGIIRUHHIUIH YHIURUHI NYRSLUHINNHNYUI NLNRHGI",
    "sex": "NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO NOT SECK S NOOOOOOOOOOOOOOOOOOOOOOOOOO!!;ONESHN;OKXDGH;LXHTGLKJ\'HGDJXTHDCHYKJLTJLKJKYTCFDJHYOP\'HG;FJMKFP;J\'KDYJPKPOKFJYDPJOCYFL;MNK",
    "secks": "NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO NOT SECK S NOOOOOOOOOOOOOOOOOOOOOOOOOO!!;ONESHN;OKXDGH;LXHTGLKJ\'HGDJXTHDCHYKJLTJLKJKYTCFDJHYOP\'HG;FJMKFP;J\'KDYJPKPOKFJYDPJOCYFL;MNK",
    "penis": "GUYS S HE SAID PEN IS PENIS SO GFUNNY LOWIJTKH UJIJHI thzlaoijh iuBIHJ UHVGIY UY sjkgfj GJKHGJHASDF GFJSDGHF",
    "furry": "AAAAAA NOOOOOO FURRIES not allowedsdjfks dafjasd  BSJIGDFJSDGKFJHSDJGFJSDGHFJSD FUryry sexf porn fart shit",
    "jams": "jams i have cramck addmctin i am die",
}


client.on('ready', () => {
    client.user.setPresence({
        status: 'online',
        activity: {
            name: '%show-words',
            type: 'PLAYING'
        }
    })
});


client.on('message', message => {
    if (message.author.bot) return;

    // Word list command
    if (message.content.startsWith('%show-words'))
    {
        var toPrint = '';
        for (word in words)
        {
            toPrint += (`\`${word}\`\n`);
        }
        
        message.channel.send({ embed: {
                title: 'NOOO DONT SAY THEM AAASGJASGDUag dfhSFD',
                description: toPrint,
                footer: {
                    text: 'For invite link and more info DM \`info\`',
                }
            }
        });
    }

    var responseNum = 0;
    // Normal functionality
    for (word in words){
        if (message.content.includes(word) && responseNum < responseLimit)
        {
            message.channel.send(words[word]);
            responseNum++;
        }
    }

    if (message.channel.type == "dm")
    {
        if (message.content.startsWith('info'))
        {
            message.author.send({ embed: {
                color: 0xd9d31e,
                title: 'yo',
                author: {
                    name: 'youcantsaythatNOOOOOO',
                    icon_url: 'https://cdn.discordapp.com/attachments/766536742081134613/766574176252592178/picardia_emoji.png'
                },
                fields: [
                    {
                        name: 'Invite Link',
                        value: 'https://discord.com/api/oauth2/authorize?client_id=766535733774123018&permissions=3072&scope=bot'
                    },
                    {
                        name: 'GitHub Repo',
                        value: 'https://github.com/nadavln/bad-word-bot'
                    },
                    {
                        name: 'Feel free to DM me for feedback',
                        value:'mr nobot#4438'
                    }
                ],
                footer: {
                    text: 'Thanks for checking out my bot!'
                }
            }});
        }
    }

});

// Your token here :
client.login(process.env.BOT_TOKEN);