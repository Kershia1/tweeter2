/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("in document ready");

//escape function to prevent cross site scripting, goes at the top of the file?
const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//errror message function after XSS validation?
$("#error-empty-tweet").hide();
$("#error-long-tweet").hide();

  const renderTweets = function (tweets) {
    console.log("in renderTweets");
    $('.tweets-container').empty();
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
    }
  };

  //take tweet obj return jquery obj with tweet html
  const createTweetElement = function (tweetStuff) {
    console.log("in createTweetElement");
    let approxTime;
    try {
      approxTime = timeago.format(tweetStuff.created_at);
    } catch (error) {
      console.error('timeago is not defined');
    }

    //create jquery obj for tweet html
    let $tweet = $(`
  <article class="tweets">
  <header class="tweets-header">
        <div class="user-img">
          <img src="${escape(tweetStuff.user.avatars)}" alt="Profile picture of ${escape(tweetStuff.user.name)}"> 
        </div> 
        <div class="user-name">
          <h6>${escape(tweetStuff.user.name)}</h6>
        </div>
        <div class="user-handle">
          <h6>${escape(tweetStuff.user.handle)}</h6>
        </div>
      </header>
      <div class="tweets-text">
        <p>${escape(tweetStuff.content.text)}</p>
      </div>
      <footer class="tweets-footer">
        <div class="tweets-time">
          <p>${approxTime}</p>
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

  const loadTweets = () => {
    $.get("/tweets", function (tweets) {
      renderTweets(tweets);
    });
  };

  //event handler for form submission
  $('#new-tweet-form').submit(function (event) {
    event.preventDefault();

    const tweetContent = document.getElementById('tweets-text').value;

    if (!tweetContent) {
      $("#error-empty-tweet").slideDown("slow");
      $("#error-long-tweet").hide();

    } else if (tweetContent.length > 140) {
      $("#error-long-tweet").slideDown("slow");
      $("#error-empty-tweet").hide();

    } else {
      $("#error-empty-tweet").hide();
      $("#error-long-tweet").hide();
      console.log("tweet is valid");
      
      const newTweet = $(this).serialize();
      console.log("new tweet is: ", newTweet);
      $(this).find('.tweets-text').val('');
      $(this).find('.counter').val(140);

      // Send the AJAX POST request to the server
      $.post("/tweets", newTweet, function (response) {
        console.log("Success Tweet Posted: ", response);
        loadTweets();
      });
    }

  });
  loadTweets();
});