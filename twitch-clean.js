// $('.chat-lines')[0].children[$('.chat-lines')[0].children.length-1].children

// // set name color
// $('.chat-lines')[0].children[x].children[3].style = "color:#777777"

// // set msg color
// $('.chat-lines')[0].children[x].children[5].style = "color: #444444"

// // inner text
// $('.chat-lines')[0].children[x].children[5].innerText

// emojis
// $('.chat-lines')[0].children[x].children[5].children
// $('.chat-lines')[0].children[x].children[5].children[0].children[0].style = 'opacity: 0.1'

// var lastMessage = $('.chat-lines')[0].children.length-1

// ------------ //

// function spamRating(message) {
//   var isMostlyCaps = function() {
//     var amountOfCaps = 0;
//     for (var i=0; i<message.length; i++) {
//       if (/[A-Z!]/.exec(message[i])) amountOfCaps += 1;
//     }
//     return (amountOfCaps / message.length > 0.5) ? 3 : 0;
//   }

//   // Duplicate Words is bugged because the object that is created has 
//   // keys you dont want to itterate through
//   // var duplicateWords = function() {
//   //   var sentance = message.match(/\w+/g);
//   //   var words = {}

//   //   for (var w in sentance) {
//   //     if (sentance[w] in words) { words[sentance[w]] += 1 } 
//   //     else { words[sentance[w]] = 1 }
//   //   }

//   //   var mostUsed = 0;
//   //   for (var key in words) {
//   //     console.log('wk', key, words, words[key]);
//   //     if (words[key] > mostUsed) mostUsed = words[key]
//   //   }
//   //   console.log('mu', mostUsed, sentance.length);
//   //   return (mostUsed / sentance.length > 0.5) ? 5 : 0;
//   // }

//   var score = 0;
//   if (message[0] === "!") score = 7;
//   if (message[0] === "@") score = 3;
//   if (message.length < 5) score += 1;
//   if (message.length > 100) score += parseInt(message.length / 100);
//   if (message.match(/\w+/g).length === 1) score += 1;
//   if (/http/.test(message)) score += 3;
//   score += isMostlyCaps();
//   // score += duplicateWords();

//   return score;
// }

// function getColor(currColor, spamRating) {
//   var rgbColor = currColor.match(/(\d+),\s?(\d+),\s?(\d+)/);
//   var weight = spamRating >= 10 ? 0.1 : (10-spamRating)/10;
//   return [
//       parseInt( parseInt(rgbColor[1]) * weight ),
//       parseInt( parseInt(rgbColor[2]) * weight ),
//       parseInt( parseInt(rgbColor[3]) * weight )
//     ];
// }



function Message(idx) {
  this.index = idx;
  this.text = $('.chat-lines')[0].children[idx].children[5].innerText;
  this.nameColor = $('.chat-lines')[0].children[idx].children[3].style.color;
  this.textColor = $('.chat-lines')[0].children[idx].children[5].style.color;
  this.emojis = $('.chat-lines')[0].children[idx].children[5].children;
  this.rating = this.spamRating(this.text);
}

Message.prototype= {
  constructor: Message,

  spamRating: function(message) {
    var isMostlyCaps = function() {
      var amountOfCaps = 0;
      for (var i=0; i<message.length; i++) {
        if (/[A-Z!]/.exec(message[i])) amountOfCaps += 1;
      }
      return (amountOfCaps / message.length > 0.5) ? 3 : 0;
    }

    var isBlacklist = function() {
      var sentance = message.match(/\w+/g);
      var blacklist = [
        "free",
        "suck",
        "fuck",
        "shit",
        "stfu",
        "spam",
        "lul",
        "lulz"
      ]

      for (var each in sentance) {
        if (blacklist.indexOf(sentance[each]) !== -1) {
          return 7;
        }
      }
      return 0;
    }

    // Duplicate Words is bugged because the object that is created has 
    // keys you dont want to itterate through
    // var duplicateWords = function() {
    //   var sentance = message.match(/\w+/g);
    //   var words = {}

    //   for (var w in sentance) {
    //     if (sentance[w] in words) { words[sentance[w]] += 1 } 
    //     else { words[sentance[w]] = 1 }
    //   }

    //   var mostUsed = 0;
    //   for (var key in words) {
    //     console.log('wk', key, words, words[key]);
    //     if (words[key] > mostUsed) mostUsed = words[key]
    //   }
    //   console.log('mu', mostUsed, sentance.length);
    //   return (mostUsed / sentance.length > 0.5) ? 5 : 0;
    // }

    var score = 0;
    if (message[0] === "!") score = 7;
    if (message[0] === "@") score = 3;
    if (message.length < 5) score += 1;
    if (message.length > 100) score += parseInt(message.length / 100);
    if (message.match(/\w+/g) && message.match(/\w+/g).length === 1) score += 1;
    if (/http/.test(message)) score += 3;
    if (this.emojis && this.emojis.length > 1) score += this.emojis.length;
    score += isBlacklist();
    score += isMostlyCaps();
    // score += duplicateWords();

    return score;
  },

  generateColor: function(currentColor, spamRating) {
    var rgbColor = currentColor.match(/(\d+),\s?(\d+),\s?(\d+)/);
    var weight = spamRating >= 10 ? 0.1 : (10-spamRating)/10;
    if (!rgbColor) rgbColor = [null, 137, 131, 149];
    return [
        parseInt( parseInt(rgbColor[1]) * weight ),
        parseInt( parseInt(rgbColor[2]) * weight ),
        parseInt( parseInt(rgbColor[3]) * weight )
      ];
  },

  setColor: function() {
    var newNameColor = this.generateColor(this.nameColor, this.rating)
    var newTextColor = this.generateColor(this.textColor, this.rating)
    // set name color
    $('.chat-lines')[0].children[this.index].children[3].style = "color: rgb(" + newNameColor.toString() + ")";
    // set text color
    $('.chat-lines')[0].children[this.index].children[5].style = "color: rgb(" + newTextColor.toString() + ")";
  },

  setEmojiTransparency: function() {
    var premodification = this.rating + 4;
    var inverseRating = premodification >= 10 ? 0.1 : (10-premodification)/10
    for (var i=0; i<this.emojis.length; i++) {
      this.emojis[i].children[0].style = 'opacity: ' + inverseRating;
    }
  }

}

var latestIdx = $('.chat-lines')[0].children.length-1;
var lastMessage = new Message(latestIdx);
console.log(lastMessage.rating, lastMessage.text);
lastMessage.setColor();
lastMessage.setEmojiTransparency();


// var lastMessageInt = $('.chat-lines')[0].children.length-1;
// var lastMessage = $('.chat-lines')[0]
//                     .children[lastMessageInt]
//                     .children[5]
//                     .innerText;
// var lastMessageRating = spamRating(lastMessage);
// var currColor = 0;
// $('.chat-lines')[0].children[lastMessageInt].children[3]
//                    .style = "color: " + getColor(currColor, lastMessageRating) - 1;
// $('.chat-lines')[0].children[lastMessageInt].children[5]
//                    .style = "color: " + getColor(currColor, lastMessageRating);
// console.log('rating: ', lastMessageRating);




