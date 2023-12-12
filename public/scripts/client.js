/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("in document ready");

//escape function to prevent cross site scripting, goes at the top of the file?
const escape = function (str) {
  let div = document.createElement('div');//creates a div element
  div.appendChild(document.createTextNode(str)); //creates a text node containing the string, and appends it to the div
  return div.innerHTML; //returns the text content of the div
}

  const renderTweets = function (tweets) {
    console.log("in renderTweets");
    $('.tweets-container').empty(); // empties the tweets container so that it doesn't keep appending the same tweets over and over again
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);//tweet html
      $('.tweets-container').prepend($tweet);//prepend to tweets container instead of append so that new tweets are at the top
    }
  };

  //take tweet obj return jquery obj with tweet html
  const createTweetElement = function (tweetStuff) {
    console.log("in createTweetElement");
    let approxTime;
    try {
      const timeagoInstance = timeago();
      approxTime = timeagoInstance.format(tweetStuff.created_at);
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

    return $tweet; //return jquery obj for tweet html
  };

  const loadTweets = () => {
    $.get("/tweets", function (tweets) {
      renderTweets(tweets);
    });
  };

  //event handler for form submission
  $('#new-tweet-form').submit(function (event) {
    event.preventDefault();
    console.log('Form submitted, performing AJAX call...');

    //form validation and alert in vanilla javascript
    const tweetContent = document.getElementById('tweets-text').value;
    if (tweetContent === null || tweetContent === "") {
      alert("Your tweet is empty, please enter some text");
      return;
    } else if (tweetContent.length > 140) {
      alert("Your tweet is too long, enter less than 140 characters");
      return;
    } else {
      console.log("tweet is valid");
      const newTweet = $(this).serialize();
      console.log("new tweet is: ", newTweet);
      $(this).find('.tweets-text').val(''); //clear the text area after submission
      $(this).find('.counter').val(140); //reset the counter to 140 after 

      // Send the AJAX POST request to the server
      $.post("/tweets", newTweet, function (response) {
        console.log("Success Tweet Posted: ", response);
        loadTweets(); //this happens if the post will finally work
      });
    }

  });
  loadTweets(); //load tweets on page load
});