var Discord = require("discord.js");

var bot = new Discord.Client();
var pre = "/";

var junkratArray = ["http://imgur.com/xiJwtZU.png", "http://i.imgur.com/GaJXTEY.png", "http://i.imgur.com/JNVvZ7M.gif", "http://i.imgur.com/qhjfGce.png", "http://i.imgur.com/Mygr1HQ.jpg", "http://i.imgur.com/M1MnMif.png", "http://i.imgur.com/2BI2dsg.jpg", "http://i.imgur.com/GDyPFFz.png", "http://i.imgur.com/EvxqbPr.png", "http://i.imgur.com/7xn7hX2.png", "http://i.imgur.com/ssIpRKP.png", "http://i.imgur.com/OQCcUsD.jpg", "http://i.imgur.com/SSTQGd2.jpg", "http://i.imgur.com/kN7kt8z.png", "http://i.imgur.com/fA3DTox.png", "http://i.imgur.com/IIP1sKw.png", "http://i.imgur.com/ggYAC0g.png", "http://i.imgur.com/I9rmNFx.png", "http://i.imgur.com/1LnyTks.png", "http://i.imgur.com/QGJdJoa.png", "http://i.imgur.com/xL9ymtv.png", "http://i.imgur.com/B4625dZ.png", "http://i.imgur.com/Po4QJly.png", "http://i.imgur.com/OWk8fBC.png", "http://i.imgur.com/H19rFZX.png", "http://i.imgur.com/CNQdWCD.png", "http://i.imgur.com/BK1Evg2.png", "http://i.imgur.com/ZmYBlaw.png", "http://i.imgur.com/8KUelRr.png", "http://i.imgur.com/CCGot1y.jpg", "http://i.imgur.com/X2zT9Lo.png", "http://i.imgur.com/JnP5dPl.jpg", "http://i.imgur.com/82EvXVA.jpg", "http://i.imgur.com/2xLYx4j.jpg", "http://i.imgur.com/k4UxX7M.png", "http://i.imgur.com/FlWRRkT.jpg", "http://i.imgur.com/dkgkJbl.png", "http://i.imgur.com/2ulPgWh.png", "http://i.imgur.com/zn3N0dy.png", "http://i.imgur.com/Q4FrS21.png", "http://i.imgur.com/CPTua9d.png", "http://i.imgur.com/8FxTGgV.png", "http://i.imgur.com/fIp9118.png", "http://i.imgur.com/9fAuqXZ.png", "http://i.imgur.com/exBeVDZ.png", "http://i.imgur.com/IQXwsHN.png"];
var jrvoiceArray = ["jr0"];

bot.on("message", msg => {
	if(msg.author.bot) return;
    
    //Help text
    if (msg.content.startsWith(pre + "help")) {
    	msg.channel.sendMessage("\`\`\`\nEvanBot - Written by Evan King (Kralovsky #9969)\n\n/junkrat\t/jr\n\tpost a random Junkrat image to chat\n/vljr\n\tpost a random Junkrat image, and play a random Junkrat voiceline\n/choose arg1 ... argN\n\tchooses one of the arguments at random\`\`\`");
    }

    //Choose between multiple things
    if (msg.content.startsWith(pre + "choose")) {
    	var choices = msg.content.split(" ");
    	if (choices[1] == null) {
    		msg.channel.sendMessage("You must supply at least 1 choice...")
    	} else {
    		var randomNum = getRandomInt(1, choices.length - 1);
    		msg.channel.sendMessage("I have decided on " + choices[randomNum] + "!");
    	}
    }

    //Post random Junkrat image
    if ((msg.content.startsWith(pre + "junkrat")) || ((msg.content.startsWith(pre + "jr")))) {
    	var args = msg.content.split(" ");
    	if ((args[1]) == null) {
	    	var randomNum = getRandomInt(0, junkratArray.length - 1);
	        msg.channel.sendMessage(junkratArray[randomNum]);
    	} else {
    		msg.channel.sendMessage(junkratArray[args[1]]);
    	}
    }

    //Post random Junkrat image and play random voiceline
    if (msg.content.startsWith(pre + "vljr")) {
    	var args = msg.content.split(" ");

    	const voiceChannel = msg.member.voiceChannel;
	    if (!voiceChannel) {
	      return msg.reply('Please be in a voice channel first!');
	    }
	    voiceChannel.join()
	      .then(connnection => {
	      	var randomNum = getRandomInt(0, junkratArray.length - 1);
        	msg.channel.sendMessage(junkratArray[randomNum]);
	    	randomNum = getRandomInt(0, jrvoiceArray.length - 1);

	      	const dispatcher = connnection.playFile("./voicelines/" + jrvoiceArray[randomNum] + ".mp3");
	        dispatcher.on('end', () => {
	          voiceChannel.leave();
	        });
	      });
  }
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("MjI5MDEwOTU5ODQ1NDI1MTUz.CsdCoA.M3EueDNX5wmRABJIZ4rCTTDhmtI");

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}