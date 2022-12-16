const Discord = require("discord.js");
const client = new Discord.Client({ intents: 3276799 });
const config = require("./config");
const Twit = require("twit");

const T = new Twit({
  // oublie pas de remplacer les keys
  consumer_key: "GDFGDFGDFGDFG",
  consumer_secret: "DFGDFGDFGDFGDFG",
  access_token: "DFGDFGDFGDFGDFG",
  access_token_secret: "DFGDFGDFGDFG",
});

client.on("messageCreate", (message) => {
  if (message.content === "ping") {
    message.reply("pong");
  }
});

// Pour récup les tweets --> !tweets TwitterUserName

client.on("messageCreate", (message) => {
  if (message.content.startsWith("!tweets")) {
    const idUser = message.content.split(" ")[1];
    T.get(
      "statuses/user_timeline",
      {
        screen_name: `${idUser}`,
        exclude_replies: true,
        include_rts: false,
      },
      function (err, data, response) {
        data.map((tweet) => {
          message.reply(tweet.text);
        });
      }
    );
  }
});

client.login("DISCORDTOKEN");

// Fonction pour avoir l'id d'un utilisateur --> !id TwitterUserName
// client.on("messageCreate", (message) => {
//   // Check if the message starts with the `!tweets` command
//   if (message.content.startsWith("!id")) {
//     // Extract the username from the message
//     const id = message.content.split(" ")[1];
//     // Send a GET request to the search/tweets endpoint of the Twitter API
//     T.get(
//       `https://api.twitter.com/2/users/by?usernames=${id}`,
//       function (err, data) {
//         if (err) {
//           console.log(err);
//         } else {
//           // Send each tweet as a message to the Discord channel
//         }
//         message.reply(`L'id twitter de ${id} est ${data.data[0].id}`);
//         console.log(data.data[0].id);
//       }
//     );
//   }
// });
