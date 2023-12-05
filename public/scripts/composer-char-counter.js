
// This function counts the characters in the tweet and updates the counter
function count() {
  const chars = $("#tweet-text").val().length;
  $(".counter").text(140 - chars);
  if (chars > 140) {
    $(".counter").addClass("negativetweet");
  } else {
    $(".counter").removeClass("negativetweet");
  }
}

$(document).ready(function () {
  $("#tweet-text").on("input", count);
});