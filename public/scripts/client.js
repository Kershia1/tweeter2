/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


/*
* wrote backwards heres the plan to get this working
 * 1- create a function that takes in a tweet object doc.ready
 * 
 * 2-test data
 * 
 * 3- render the tweets to the page
 * 
 * 4- create tweets
 * 
 * 5- event listener for the submit button
 * 
 * 6- prevent the default behaviour of the submit event
 * 6-b serialize the form data
 * 
 * 7- use the jQuery library to submit a POST request that sends the serialized data to the server
 * 
 * 8- create an AJAX POST request in client.js that sends the form data to the server.
 * 
 */
console.log("in client.js");
$(document).ready(function () {

  console.log("in document ready");
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
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);// creates a variable that calls the createTweetElement function and passes in the tweet object
      $('#tweets-container').append($tweet);// takes return value and appends it to the tweets container
    }
  };

  const createTweetElement = function (tweet) {
    let timestamp = new Date(tweet.created_at);
    let $time = $('<time>').attr('datetime', timestamp.toISOString()).text(timeago.format(timestamp));
    $time.timeago();

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
              <p>${$time.timeago()}</p>
            </div>
            <div class="tweets-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-retweet"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
        </article> `);
    //console.log($tweet.html());
    return $tweet;
  };


  const $tweet = createTweetElement(data);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweets-container').append($tweet);

  renderTweets(data);

  const formData = $(this).serialize();
  console.log('Seralized data: ', formData);

  // Send the AJAX POST request to the server 
  $.ajax({
    url: '/tweets',
    method: 'POST',
    data: formData,
    success: (response) => {
      console.log('Success: ', response);
    },
    error: (err) => {
      console.log('Error: ', err);
    }
  });

  // Fetch tweets from the http://localhost:8080/tweets page
  const loadTweets = function () {
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