const config = require("./botsettings.json");
const trialroulette = require("./trials.js");
const prizes = require("./prizes.js");
const Discord = require("discord.js");
const fs = require("fs");


const app = require('http').createServer((req, res) => res.send('Ahoy!'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


const bot = new Discord.Client({disableEveryone: true});
var xFunc = {};

trialroulette.trial.sort(function() {
	return .5-Math.random();
});

prizeholding = prizes.prizes;





/* relevant vars */

const prefix = "!sabo";


bot.on("message", (message) => {

//exit if not exist
if(!message.content.startsWith(config.prefix)) { return; }

if(message.content.startsWith(config.prefix)) {

    

    const args = message.content.slice(config.prefix.length).split(/ +/g);
    // const command = args.shift().toLowerCase();
    const command = args[1].toLowerCase();

    if (args.length === 0) {
        message.channel.send("Excuse me, Can I help you?");

    }
    else {
        message.channel.send("Gotcha!");


        if ( typeof xFunc[command] === "function") {
            xFunc[command](args, message);

        }        
        else {
            message.channel.send("I'm sorry, I don't know what you want...");
        }


        // message.channel.send(command);
        
    }








 }





});

bot.login(process.env.TOKEN);




/*ZHLOE FUNCTIONS*/



// console.log('The value of PORT is:', process.env.PORT);





xFunc.roll = function(args, message) {
   	rollnumber = Math.ceil(Math.random()*4);
    message.channel.send("You rolled a :game_die: **"+rollnumber+"**");


}

xFunc.resetprizes = function(args, message) {    
     message.channel.send("Sucessfully resetted the prizelist");
     prizeholding = prizes.prizes;


}

xFunc.addprize = function(args, message) {  
	 let newprize = message.content.split(args[1])[1].trim();
	 if(newprize.indexOf(",") > -1) {
	 	let prizename = newprize.split(",")[0];
	 	let prizeqty = newprize.split(",")[1].trim();

	 	message.channel.send("new prize added: "+prizename);
	 	message.channel.send("quantity: "+prizeqty);

	 	// priceholding.push(new Array(prizename, prizeqty) );


	 }
	 else {
	 	message.channel.send("Excuse me, but you need to tell me how many. **E.g. !sabo addprize Potion, 10**");

	 }
     
     


}



xFunc.prize = function(args, message) {
    prizelength = prizes.prizes.length;

    rollprize = Math.floor(Math.random()*prizelength);



    if (prizes.prizes === undefined || prizes.prizes.length == 0) {
            message.channel.send(":confetti_ball: You won a prize, but sadly there are no prizes left...");

        }

    else {
        message.channel.send("You won a prize! It is...**"+prizes.prizes[rollprize][0]+"**");
        
        prizes.prizes[rollprize][1]--;
            
            
        if (prizes.prizes[rollprize][1] == 0) {
            
            prizes.prizes.splice(rollprize, 1);

        }
        
            

    }
    

}


xFunc.trial = function(args, message) {
    trialslength = trialroulette.trial.length;

    rolltrial = Math.floor(Math.random()*trialslength);



    
     message.channel.send("You stepped on the black Pillow and here is your result~");
    message.channel.send("**"+trialroulette.trial[rolltrial][0]+"**", {
            files: [
                "./instances/"+trialroulette.trial[rolltrial][1]+".jpg"
            ]
        });
     


}










// xFunc.listenraidtime = function (message) {

//     setRaidtime = message.split(" ")[1];

//     if (setRaidtime == "") {
//         message.channel.send("No Raid Time has been set by now. Please discuss and send me with !zhloe listenRaidtime");       
//     }
//     else {
//         message.channel.send("The Group is currently raiding at: "+setRaidtime);       

//     }

    
// }


// bot.on("ready", () => {
//   console.log("I am ready!");
// });

// bot.on("message", (message) => {
//   if (message.content.startsWith("!zhloe")) {
//     stringMessage = message.content;
//     getCommand = stringMessage.split("!zhloe")[1].split(" ")[1];
//     message.channel.send(getCommand);

//     // windowraidtime(message);
//     // window[getCommand]();
//     xFunc[getCommand](message);




//   }
// });


// console.log(botSettings.token);
// console.log(botSettings.prefix);


// var Discord = require('discord.io');
// var logger = require('winston');
// var auth = require('./botsettings.json');
// var discojs = require('discord.js');
