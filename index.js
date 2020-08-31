//Importo la dependencia de discord.js y el archivo de configuración que contiene el Token para loggear al bot
const Discord = require("discord.js");
const config = require("./config.json");
const DateFormat = require('dateformat');
const { convertidor } = require('./utils/utils.js');

const client = new Discord.Client();//Inicializo el client de discord
const prefix = "!";//Seteo un prefijo para que el bot reconozca los comandos

let horaInicial = Date;
let horaFinal = Date;
let tiempoActual = Date;
let comienzoPausa = Date;


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
    if (comenzoLaClase()) {
      message.reply("La clase ya comenzó.");
    } else {
      horaInicial = Date.now();
      message.reply(`Vamos a comenzar con el curso. Son las: ` + DateFormat(Date.now(), 'HH:MM') + "Hs.");
    }
  }

  if (command === "time") {
    if (!comenzoLaClase()) {
      message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
    } else {
      message.reply(`Son las ` + DateFormat(Date.now(), 'HH:MM') + "Hs.");
      message.reply(`Empezamos hace: ` + convertidor(calcularTiempoActual(horaInicial)));
    }
  }
  if (command === "stop") {
    if (!comenzoLaClase()) {
      message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
    } else {
      horaFinal = Date.now();
      message.reply(`Clase finalizada. La clase de hoy duró: ` + convertidor(calcularTiempoActual(horaInicial)));
      horaInicial = Date;
      horaFinal = Date;
    }
  }
  if (command === "pause") {
    if (!comenzoLaClase()) {
      message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
    }
    else if (!isNaN(comienzoPausa)) {
      message.reply("Ya estás en pausa.");
    } else {
      message.reply("Ahora la clase está en pausa.");
      comienzoPausa = Date.now();
    }
  }
  if (command === "resume") {
    if (!comenzoLaClase()) {
      message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
    }
    else if (isNaN(comienzoPausa)) {
      message.reply("No estás en pausa.");
    } else {
      message.reply("La pausa finalizó y duró: " + convertidor(calcularTiempoActual(comienzoPausa)));
    }
  }
  if (command === "help") {
    message.reply
      (`
Hola, soy un bot que los va a ayudar a controlar el tiempo de las clases que hagan por discord :yum:\n
  Mis comandos son:\n
  :play_pause: "**-start**" : Este comando se utiliza para comenzar la clase.\n
  :play_pause: "**-stop**" : Este comando se utiliza para finalizar la clase.\n
  :play_pause: "**-pause**" : Para pausar la clase.\n
  :play_pause: "**-resume**" : Para continuar.\n
  :timer: "**-time**" : Este comando se utiliza para ver cuanto tiempo llevan en clase.\n
  :question: "**-help**" : Para ver la lista de comandos.\n
  \n
  También podés encontrar mi código fuente en:
  https://github.com/leanargu/botardo/archive/master.zip
      `);
  }
}

// switch (message) {
//   case "start":
//     if (comenzoLaClase()) {
//       message.reply("La clase ya comenzó.");
//     } else {
//       horaInicial = Date.now();
//       message.reply(`Vamos a comenzar con el curso. Son las: ` + DateFormat(Date.now(), 'HH:MM') + "Hs.");
//     }
//     break;
//   case "time":
//     if (!comenzoLaClase()) {
//       message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
//     } else {
//       message.reply(`Son las ` + DateFormat(Date.now(), 'HH:MM') + "Hs.");
//       message.reply(`Empezamos hace: ` + convertidor(calcularTiempoActual(horaInicial)));
//     }
//     break;
//   case "stop":
//     if (!comenzoLaClase()) {
//       message.reply("Todavía no empezamos la clase de hoy. \nRecordá que para empezar podes usar el comando **!start**");
//     } else {
//       horaFinal = Date.now();
//       message.reply(`Clase finalizada. La clase de hoy duró: ` + convertidor(calcularTiempoActual(horaInicial)));
//       horaInicial = Date;
//       horaFinal = Date;
//     }
//     break;
//   default:
//     //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
//     break;
// }

const calcularTiempoActual = horaInicial => {
  return Date.now() - horaInicial;
}

let comenzoLaClase = () => {
  return !horaInicial || !isNaN(horaInicial);
};

//Loggeo del bot
client.login(config.BOT_TOKEN);