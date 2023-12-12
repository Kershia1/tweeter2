/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  console.log("in document ready");

  //take in an array of tweet objects and then append each one to the tweets container
  const renderTweets = function (tweets) {
    console.log("in renderTweets");
    $('#tweets-container').empty(); // empties the tweets container so that it doesn't keep appending the same tweets over and over again
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);//tweet html
      $('#tweets-container').prepend($tweet);//prepend to tweets container instead of append so that new tweets are at the top
    }
  };

  //take tweet obj return jquery obj with tweet html
  //curl -X POST -d "tweetContent=textiytexttext" http://localhost:8080/
  const createTweetElement = function (tweet) {
    console.log("in createTweetElement");
    const approxTime = timeago.format(tweet.created_at); //still broken grrh!

    //create jquery obj for tweet html
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

    return $tweet; //return jquery obj for tweet html
  };

  const loadTweets = () => {
    $.get("/", function (tweets) {
      console.log('Success: ', tweets);
      renderTweets(tweets.reverse());
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
      $(this).find('#tweets-text').val(''); //clear the text area after submission
      $(this).find('.counter').val(140); //reset the counter to 140 after 

      // Send the AJAX POST request to the server
      $.post("/", newTweet, function (response) {
        console.log("Success Tweet Posted: ", response);
        loadTweets(); //this happens if the post will finally work
      });
    }

  });
  loadTweets(); //this is when everything is loaded, so it will fetch and render the tweets on page load after the document is ready and parsed
});


// Fetch tweets from the http://localhost:8080/tweets page
//am I referencing the right page here? is it '/tweets' or '/'? since I seem to stay on the splash page when I submit a tweet I think it's '/'
// const loadTweets = () => {
//   $.ajax({
//     url: "/",
//    // url: '/tweets',
//     method: 'GET',
//     dataType: 'json',
//     success: (tweets) => {
//       console.log('Success: ', tweets);
//       renderTweets(tweets);
//     },
//     error: (err) => {
//       console.log('Error: ', err);
//     }
//   });
// };
//dif axjax call for get request



// Send the AJAX POST request to the server
// $.ajax({
//   url: "/",
//   //url: '/tweets',
//   method: 'POST',
//   data: formData,
//   success: (response) => {
//     console.log('Success: ', response);
//     loadTweets(); //load tweets again to fetch and render the new tweet only?
//   },
//   error: (err) => {
//     console.log("Error: ", err);
//   }
// });

//work flow 
//doc is ready, load tweets will fetch and render tweets

//render tweets will call createTweetElement for each tweet

//when the form is submitted, the form data is serialized and validataed and sent to the server via ajax post request

//successful post req will result in loadtweets being passed again to fetch and render the new tweet AND old tweets, which will be prepended to the tweets container

//maybe render in reverse order so that new tweets are at the top, once I get eerything working again?
