/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("in document ready");

const renderTweets = function (tweets) {
  console.log("in renderTweets");
  $('#tweets-container').empty();
  for (let tweet of tweets) {
    let $tweet = createTweetElement(tweet);// creates a variable that calls the createTweetElement function and passes in the tweet object
    $('#tweets-container').prepend($tweet);// takes return value and appends it to the tweets container
  }
};

const createTweetElement = function (tweet) {
  console.log("in createTweetElement");
  const approxTime = timeago.format(tweet.created_at);

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
      </header>
      <div class="tweets-text">
        <p>${tweet.content.text}</p>
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

  $('#new-tweet-form').submit(function (event) {
    event.preventDefault();
    console.log('Form submitted, performing AJAX call...');
  
    //form validation and alert in vanilla javascript
    const tweetContent = document.getElementById('tweets-text').value;
    if (tweetContent === null || tweetContent === "") {
      alert("Your tweet is empty, please enter some text");
      return
    }

    if (tweetContent.length > 140) {
      alert("Your tweet is too long, enter less than 140 characters");
      return;
    }

  // Serialize the form data into a query string
  const formData = $(this).serialize();
  console.log('Seralized data: ', formData);

  // Send the AJAX POST request to the server
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
    success: (response) => {
      console.log('Success: ', response);
      loadTweets();
    },
    error: (err) => {
      console.log("Error: ", err);
    }
  });
});

  // Fetch tweets from the http://localhost:8080/tweets page
  const loadTweets = () => {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: (tweets) => {
        console.log('Success: ', tweets);
        renderTweets(tweets);
      },
      error: (err) => {
        console.log('Error: ', err);
      }
    });
  };
loadTweets();
});