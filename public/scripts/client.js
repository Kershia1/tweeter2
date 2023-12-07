/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
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
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
let $tweet = $(`
<article class="tweets">
        <header class="tweets-header">
            <div class="user-img">
              <img src="${tweet.user.img}" alt="Profile picture of ${tweet.user.name}"> 
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
              <p>${timeago.format(tweetData.created_at)}</p>
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

renderTweets(data);

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
 */