/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
console.log("in client.js");
$(document).ready(function () {
  // this function is called when the user submits a tweet

  //this is the pre-made data that I'm using to test the app
/*  console.log("in document ready");
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function (tweets) {
  console.log("in renderTweets");
  $('#tweets-container').empty();// empties the tweets container, I can't remember why I need to do this..? 
  for (let tweet of tweets) {// loops through tweets
    let $tweet = createTweetElement(tweet);// creates a variable that calls the createTweetElement function and passes in the tweet object
    $('#tweets-container').append($tweet);// takes return value and appends it to the tweets container
  }
};
*/


const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const createTweetElement = function (tweet) {
  let timeagoMoment = timeago();
  console.log("in createTweetElement");
  let $tweet = $(`
<article class="tweets">
        <header class="tweets-header">
            <div class="user-img">
              <img src="${tweet.user.avatars}" alt="Profile picture of ${tweet.user.name}"> 
            </div> 
                <div class="user-name">
                <h6>${tweet.user.name}</h6>
                </div>
            <div class="user-handle">
              <h6>${tweet.user.handle}</h6>
            </div>
          </div>
        </header>

        <div class="tweets-text">
          <p>${tweet.content.text}</p>
        </div>
          <footer class="tweets-footer">
            <div class="tweets-time">
              <p>${timeagoMoment.format(tweet.created_at)}</p>
            </div>
            <div class="tweets-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article> `);
  return $tweet;
};


const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

/*renderTweets(data);


//using AJAX with jQuery
//Serialize the form data
//Use the jQuery library to submit a POST request that sends the serialized data to the server
//The jQuery .serialize() function turns a set of form data into a query string. This serialized data should be sent to the server in the data field of the AJAX POST request.

  const loadTweets = function () {
//add an event listener that listens for the submit event
//prevent the default behaviour of the submit event (data submission and page refresh)
event.preventDefault();
//create an AJAX POST request in client.js that sends the form data to the server.
  } */

});





/**
 * its been a while since I've done this, so I'm going to try to write out the steps I need to take to get this working
 * 
 * remeber to use the document ready function
 * $() is the same as document.ready
 * $ denotes a variable that is a jQuery object
 * 
 * `` denotes a template literal
 * 
 * these will contain the html markup for the tweets
 * which is then wrapped with jQuery to create a jQuery object $(`<article class="tweets">...</article>`)
 * 
 * ${timeago.format(tweetData.created_at)}
 * this is a function that takes the date and formats it to be more readable
 * and returns the date in a string
 * 
 * nervous about the timeago function, but I think I can figure it out
 * 
 * 
 *   // this function is called when the page loads
  //it wraps everything in the document ready function
  //then parse all the data and any scripts will be encountered to prevent errors when loading the page, until DOM is ready to be manipulated


  /*remeber is shorthand for 
  document.addEventListener('DOMContentLoaded', function() {
  // Your code goes here
});
  */
