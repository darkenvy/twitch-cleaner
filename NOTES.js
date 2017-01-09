$('.chat-lines')[0].children[$('.chat-lines')[0].children.length-1].children

// set name color
$('.chat-lines')[0].children[x].children[3].style = "color:#777777"

// set msg color
$('.chat-lines')[0].children[x].children[5].style = "color: #444444"

// inner text
$('.chat-lines')[0].children[x].children[5].innerText

emojis
$('.chat-lines')[0].children[x].children[5].children
$('.chat-lines')[0].children[x].children[5].children[0].children[0].style = 'opacity: 0.1'

var lastMessage = $('.chat-lines')[0].children.length-1

// ------------ //



console.log("---- Not Spam ----");

console.log(spamRating("Can you give me a shout out my YouTube is jordan lookabill subscribe I'm new to youtube"));
console.log(spamRating("You know Carlsegan42"));
console.log(spamRating("thx bro"));
console.log(spamRating("Well had an idea"));
console.log(spamRating("an i saw pope francis in mexico city, he goes on february on last year"));
// console.log(spamRating("btw I actually beat the blind Kaizo! took me an hour and a half though haha"));

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
