require("dotenv").config();

var Spotify = require("node-spotify-api");
var keys = require("./keys");
var Twitter = require("twitter");
var client = new Twitter(keys.twitter);
var request = require("request");
var fs = require("fs");
var spotify = new Spotify(keys.spotify);



// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`
var userInput = process.argv[2];



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
    var params = { screen_name: 'TJDibs22' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);
            for (i = 0; i < tweets.length; i++) {
                console.log("~~~~~~~~~~LIRI Results~~~~~~~~~~");
                console.log((i+1) + '  ' + tweets[i].text);
                console.log(tweets[i].created_at);
                console.log("-----------------------------------");


            }
        }
    });
}
// myTweets();

//spotify function
function spotifyThis() {
    if (title == '') {

        title = 'I Want it That Way'
    }

    spotify.search({ type: 'track', query: title }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        var track = data.tracks.items[0];
        // console.log(track);
        console.log("~~~~~~~~~~LIRI Results~~~~~~~~~~");
        console.log('artists: ', track.artists[0].name);
        console.log('song name: ', track.name);
        console.log('song preview: ', track.preview_url);
        console.log('album name: ', track.album.name);
        console.log("-----------------------------------");
    });
}


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
function movieThis() {
    console.log(title);
    
    if (title == '') {
        
        title = 'Billy Madison';

    }
    var omdbURL = 'http://www.omdbapi.com/?t=' + title + '&plot=short&tomatoes=true&apikey=trilogy';

    request(omdbURL, function (error, response, body) {
      

        //create varrible parse body of site and recover movie info
        var data = JSON.parse(body);
        console.log("~~~~~~~~~~LIRI Results~~~~~~~~~~");
        console.log("Title: " + data.Title);
        console.log("Release Year: " + data.Year);
        console.log("IMdB Rating: " + data.imdbRating);
        console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
        console.log("Country: " + data.Country);
        console.log("Language: " + data.Language);
        console.log("Plot: " + data.Plot);
        console.log("Actors: " + data.Actors);
        console.log("-----------------------------------");


    });
}



function doWhatItSays() {
    //read file from random.txt console log i want it that way from file
    fs.readFile('random.txt', 'utf8', function (error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(',')
        console.log(dataArr);
        var action = dataArr[0];
        if(action === 'my-tweets'){
            myTweets();
        }else if(action === 'spotify-this-song'){
            title = dataArr[1];
            spotifyThis();
        }else if(action === 'movie-this'){
            title = dataArr[1];
            movieThis();
        }
    });
}

















