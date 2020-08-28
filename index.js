//Importo la dependencia de discord.js y el archivo de configuración que contiene el Token para loggear al bot
const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();//Inicializo el client de discord
const prefix = "!";//Seteo un prefijo para que el bot reconozca los comandos

//Funcionalidad
client.on("message", function(message) {
    if (message.author.bot) return; //Si el mensaje es de algun bot, no hagas nada.
    if (!message.content.startsWith(prefix)) return; //Si el mensaje no comienza con el prefijo setteado: ignoralo.
  });

  
//Loggeo del bot
client.login(config.BOT_TOKEN);