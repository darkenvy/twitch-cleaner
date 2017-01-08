// $('.chat-lines')[0].children[$('.chat-lines')[0].children.length-1].children

// // set name color
// $('.chat-lines')[0].children[x].children[3].style = "color:#777777"

// // set msg color
// $('.chat-lines')[0].children[x].children[5].style = "color: #444444"

// // inner text
// $('.chat-lines')[0].children[x].children[5].innerText


// var lastMessage = $('.chat-lines')[0].children.length-1

// ------------ //

function spamRating(message) {
  var isMostlyCaps = function() {
    var amountOfCaps = 0;
    for (var i=0; i<message.length; i++) {
      if (/[A-Z!]/.exec(message[i])) amountOfCaps += 1;
    }
    return (amountOfCaps / message.length > 0.5) ? 3 : 0;
  }

  var duplicateWords = function() {
    var sentance = message.match(/\w+/g);
    var words = {}

    for (var w in sentance) {
      if (sentance[w] in words) { words[sentance[w]] += 1 } 
      else { words[sentance[w]] = 1 }
    }

    var mostUsed = 0;
    for (var key in words) {
      if (words[key] > mostUsed) mostUsed = words[key]
    }

    return (mostUsed / sentance.length > 0.5) ? 5 : 0;
  }

  var score = 0;
  if (message[0] === "!") score = 7;
  if (message[0] === "@") score = 3;
  if (message.length < 5) score += 1;
  if (message.length > 100) score += parseInt(message.length / 100);
  if (message.match(/\w+/g).length === 1) score += 1;
  if (/http/.test(message)) score += 3;
  score += duplicateWords();
  score += isMostlyCaps();

  return score;
}

console.log("---- Not Spam ----");

console.log(spamRating("Can you give me a shout out my YouTube is jordan lookabill subscribe I'm new to youtube"));
console.log(spamRating("You know Carlsegan42"));
console.log(spamRating("btw I actually beat the blind Kaizo! took me an hour and a half though haha"));

console.log("---- Ignore Special Cases ----");

console.log(spamRating("@ther8pist Raptor was fun until you learnt to cheese the raptors with the bombs"));
console.log(spamRating("2"));
console.log(spamRating("Moo 🐮"));
console.log(spamRating("@mainman hey hows it going?"));
console.log(spamRating("!add movie"));

console.log("---- Spam ----");

console.log(spamRating("CoolStoryBob  CoolStoryBob  CoolStoryBob  CoolStoryBob"));
console.log(spamRating("I AM YELLING!!!!!!!!!!!!!!"));
console.log(spamRating("but now I am not http://renomckenzie.com/"));
console.log(spamRating("Can you give me a shout out my YouTube is jordan lookabill subscribe I'm new to youtube Can you give me a shout out my YouTube is jordan lookabill subscribe I'm new to youtube Can you give me a shout out my YouTube is jordan lookabill subscribe I'm new to youtube"));
console.log(spamRating("https://discord.gg/carlsagan42 https://discord.gg/carlsagan42 https://discord.gg/carlsagan42 https://discord.gg/carlsagan42"));
