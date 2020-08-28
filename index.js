//Importo la dependencia de discord.js y el archivo de configuración que contiene el Token para loggear al bot
const Discord = require("discord.js");
const config = require("./config.json");

//Inicializo el client de discord
const client = new Discord.Client();

//Funcionalidad
client.on("message", function(message) {
    if (message.author.bot) return;
  });

//Loggeo del bot
client.login(config.BOT_TOKEN);