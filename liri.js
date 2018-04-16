require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var keys = require("./keys");
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);


// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
var userInput = process.argv[2];
console.log(process.argv);


var title = process.argv.slice(3).join("+");
// console.log(title);

// // switch statement
switch (userInput) {
case "my-tweets":
    myTweets();
    break;
case 'spotify-this-song':
    spotifyThis();
    break;
case 'movie-this':
    movieThis();
    break;
case 'do-what-it-says':
    doWhatItSays();
    break;
}

// twiter feed
function myTweets() {
    console.log('inside my tweets');

    // var client = new Twitter(keys.twitter);
    var params = { screen_name: 'tj dibs' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
            for (i = 0; i < 21; i++) {

                console.log(i  + '  ' + tweets[i].text);
                console.log(tweets[i].created_at);
                

            }
        }
    });
}
// myTweets();

//spotify function
function spotifyThis() {
    
    spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

       var track = data.tracks.items[0];
       console.log('artists: ', track.items[0].artists[0].name);
       console.log('song name: ', track.items[0].name);
       console.log('song preview: ', track.items[0].artists[0].external_urls_spotify);
       console.log('album name: ', track.items[0].album.name);
       
    });
}
spotifyThis();

// ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```
//omdb function
function movieThis(){
    var omdbURL = 'http://www.omdbapi.com/?t=' + title + '&plot=short&tomatoes=true&apikey=trilogy';
  
    request(omdbURL, function (error, response, body){
     // If the request is successful
     if(title === undefined){
         title = 'Billy Madison';
     }
        //create varrible parse body of site and recover movie info
        var body = JSON.parse(body);

        console.log("Title: " + body.Title);
        console.log("Release Year: " + body.Year);
        console.log("IMdB Rating: " + body.imdbRating);
        console.log("Rotten Tomatoes Rating: " + body.tomatoRating);
        console.log("Country: " + body.Country);
        console.log("Language: " + body.Language);
        console.log("Plot: " + body.Plot);
        console.log("Actors: " + body.Actors);
       
 
    });
}



function doWhatItSays() {
 
    fs.readFile('random.txt', 'utf8', function(error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
        
    });
}



       
  












