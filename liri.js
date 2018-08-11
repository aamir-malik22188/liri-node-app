require('dotenv').config()

//NPM packages and variables
var twitter = require('twitter');
var spotify = require('node-spotify-api')
var request = require('request');
var fs = require('fs');
var keys = require('./keys.js');
var client = new twitter(keys.twitter); 
var spotify = new spotify(keys.spotify);


var nodeArgs = process.argv[2];
var nodeArgs2 = process.argv[3];

//variable for song or movie request
var ask = "";

for (var i=3; i < nodeArgs.length; i++){
    if (i>3 && i <nodeArgs.length){
        ask = ask + "+" + nodeArgs[i];
    }else{
        ask = ask + nodeArgs[i];
    }
}




//Function for Twitter
function displayTweets (){
    var params = {screen_name: 'TheRealAamir'};
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if(!error){
            console.log(tweets)
          for(var i = 0; i<tweets.length; i++){
            var date = tweets[i].created_at;
            console.log("@TheRealAamir: " + tweets[i].text + " Created At: " + date.substring(0, 19));
            console.log("-----------------------");
    
          }
        }else{
          console.log('Error occurred');
        }
      });
    }
    
    console.log("display tweets");





//Function for Spotify
function spotifySong(song){
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            for(var i = 0; i < data.tracks.item.length; i++){
                var songData = data.tracks.item[i];
                consol.log("Artist: " + songData.artists[0].name);
            }
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });

}


//Function for OMDB
function omdbData(movie){
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log("Release Year: " + JSON.parse(body).Year);
        }else{
            comsole.log("Error Occured")
        }
      });
      omdbData.print();
}
