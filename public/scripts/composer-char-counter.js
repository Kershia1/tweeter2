
//allot 2 hours to assingment after mentor assistance with the post request.
console.log('JavaScript file loaded');
$(document).ready(function() { // <-- added missing parentheses
  console.log('document is ready');
 let maxCharacters = 140;

 $('#tweet-text').on('input', function() {
  //  console.log('input event fired');
   let input = $(this).val().length;//determines the length of the counter
   // console.log(input);
   let counter = maxCharacters - input;
   // console.log(counter);
   let $counterElement = $(this).siblings('.counter');
    // console.log($counterElement);
   $counterElement.text(counter);

   if (counter < 0) {
    //  console.log('counter is negative');
     $counterElement.addClass('negative');
   } else {
    //  console.log('counter is positive');
     $counterElement.removeClass('negative');
   }

   if (counter < 1) {
    //  console.log('counter is less than 1');
     $counterElement.text('we cannot post empty tweets, please write something');
   }
 }); // <-- added missing comma
});

/*
The .on() method in jQuery is used to attach one or more event handlers for specified events to selected elements.
 * 
  * Psuedo Code: 
  * maxCharacters = 140;
  * minCharacters = 1;
  * 
  * The 'input' event is fired every time the value of the input field changes. This can be due to various actions such as typing on the keyboard, pasting content, or undoing previous input.
  * 
  * //this is the input event I want to listen for with .on()
  * input = .length 
  * 
  * The function provided as the second argument to .on() is the event handler that gets executed every time the 'input' event is fired. In this case, this function is used to calculate and display the remaining characters.
  * 
  * //this is how I will calculuate how many characters are left to enter and display it in the counter i.e $counterElement (140 - 60 `input` = 80 characters left)
  * counter = maxCharacters - input; 
  * 
  * //the counter will be displayed in the $counterElement with the remaining characters left to enter
  * $counterElement = jQuery obj callback 
  * 
  * //msg for user to enter something in the text area
  * if < 1 return, ("we cannot post empty tweets, please write something");
  * 
  * //msg to user that they have exceeded the max characters allowed
  * 
  * if > 140 return, ("you have exceeded the max characters allowed, please delete some characters");
  */
  

/**
 * 
 * $(document).ready runs a callback when the DOM is ready to be manipulated with jQuery. Without it we might accidentally try to access HTML elements that the browser hasn't had the chance to load, causing errors.

Test that it is working by defining a console.log within the $(document).ready callback.
 */

/**
 * Psuedo Code: 
 * maxCharacters = 140;
 * minCharacters = 1;
 * 
 * input = .length 
 * 
 * counter = maxCharacters - input; 
 * 
 * $counterElement = jQuery obj callback 
 * 
 * if < 1 return, ("we cannot post empty tweets, please write something");
 */