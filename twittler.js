var twittler = function() {

  var displayTweets = function(tweets) {
    var $tweetDisplay = $('.tweet-display');
    $tweetDisplay.html('');

    var index = tweets.length - 1;
    var numTweets = 0;
    while(index >= 0 && numTweets < 20){
      var tweet = tweets[index];
      var $tweet = $('<div class="tweet"><span class="user"></span><span class="message"></span></div>');

      $tweet.children('.user').text('@' + tweet.user);
      $tweet.children('.message').text(' : ' + tweet.message);
      $tweet.appendTo($tweetDisplay);

      var $timestamp = $('<div class="timestamp"></div>');
      $timestamp.text($.timeago(tweet.created_at));
      $timestamp.appendTo($tweetDisplay);

      index -= 1;
      numTweets++;
    }
  };

  var refreshFeed = function() {
    $('.refresh-button').text('New Tweet');
    displayTweets(streams.home);
  };

  var displayUserTweets = function(user) {
    $('.refresh-button').text('More Tweet');
    displayTweets(streams.users[user]);    
  };

  return {
    refreshFeed: refreshFeed,
    displayUserTweets: displayUserTweets
  }
}();

$(document).ready(function(){
  // Initialize display by showing home feed
  twittler.refreshFeed();
  $('.refresh-button').on('click', twittler.refreshFeed);
  $('.tweet-display').on('click', '.tweet .user', function(event) {
    var user = $(this).text().slice(1);
    console.log(user);
    twittler.displayUserTweets(user);
  });
});