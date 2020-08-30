//Importo la dependencia de discord.js y el archivo de configuración que contiene el Token para loggear al bot
const Discord = require("discord.js");
const config = require("./config.json");
const DateFormat = require('dateformat');

const client = new Discord.Client();//Inicializo el client de discord
const prefix = "!";//Seteo un prefijo para que el bot reconozca los comandos

let horaInicial = Date;
let horaFinal = Date;
let tiempoActual = Date;

//Detecta el evento MENSAJE y lo recibe por parámetro
client.on("message", function (message) {
  validarMensaje(message)
  const commandBody = message.content.slice(prefix.length);//eliminar el prefijo del contenido de mensaje y asignar el resultado a la constante commandBody
  const args = commandBody.split(' ');// toma el mensaje con el prefijo eliminado y utiliza el método split en él, con un espacio como separador. Esto lo divide en una matriz de subcadenas y hace una división dondequiera que haya un espacio. 
  const command = args.shift().toLowerCase();//elimina el primer elemento de la matriz de args (que será el nombre de comando que se proporciona), lo convierte en minúscula y, luego, lo asigna a la constante command.
  //Funcionalidad 
  responder(command, message)

});

//validar mensaje
const validarMensaje = message => {
  if (message.author.bot) return; //Si el mensaje es de algun bot, no hagas nada.
  if (!message.content.startsWith(prefix)) return; //Si el mensaje no comienza con el prefijo setteado: ignoralo.
}

const responder = (command, message) => {
  if (command === "start") {
    if (!isNaN(horaInicial)) {
      message.reply("La clase ya comenzó.");
    } else {
      horaInicial = Date.now();
      message.reply(`Vamos a comenzar con el curso. Son las: ` + DateFormat(Date.now(), 'HH:MM') + "Hs.");
    }
  }

  if (command === "time") {
    if (!horaInicial || isNaN(horaInicial)) {
      message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
    } else {
      message.reply(`Son las ` + DateFormat(Date.now(), 'HH:MM') + "Hs.");
      message.reply(`Empezamos hace: ` + timeConversion(calcularTiempoActual(horaInicial)));
    }
  }

  if (command === "stop") {
    if (!horaInicial || isNaN(horaInicial)) {
      message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
    } else {
      horaFinal = Date.now();
      message.reply(`Clase finalizada. La clase de hoy duró: ` + timeConversion(calcularTiempoActual(horaInicial)));
      horaInicial = Date;
      horaFinal = Date;
    }
  }

  if (command === "help") {
    message.reply
      (`Hola, soy un bot que los va a ayudar a controlar el tiempo de las clases que hagan por discord :yum:\n
        Mis comandos son:\n
        :play_pause: "**-start**" : Este comando se utiliza para comenzar la clase.\n
        :play_pause: "**-stop**" : Este comando se utiliza para finalizar la clase.\n
        :timer: "**-time**" : Este comando se utiliza para ver cuanto tiempo llevan en clase.\n
        :question: "**-help**" : Para ver la lista de comandos.\n
        \n
        También podés encontrar mi código fuente en:
        https://github.com/leanargu/botardo/archive/master.zip
      `);
  }
}






function timeConversion(millisec) {

  var seconds = (millisec / 1000).toFixed(1);

  var minutes = (millisec / (1000 * 60)).toFixed(1);

  var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

  var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return seconds + " Segundos";
  } else if (minutes < 60) {
    return minutes + " Minutos";
  } else if (hours < 24) {
    return hours + " Horas";
  } else {
    return days + " Dias"
  }
}

const calcularTiempoActual = horaInicial => {
  return Date.now() - horaInicial;
}

//Loggeo del bot
client.login(config.BOT_TOKEN);