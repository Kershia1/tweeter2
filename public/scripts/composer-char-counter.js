
// This function counts the characters in the tweet and updates the counter
function count() {
  const chars = $("#tweets-text").val().length;
  $(".counter").text(140 - chars);
  if (chars > 140) {
    $(".counter").addClass("negativetweet");
  } else {
    $(".counter").removeClass("negativetweet");
  }
}

$(document).ready(function () {
  $("#tweets-text").on("input", count);
});