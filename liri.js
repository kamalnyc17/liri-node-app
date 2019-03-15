// grabbing the fs package to handle read/write.
var fs = require("fs");
var text;

/* loading all required libraries */
require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");

/* global variables */
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var key1 = process.argv[2];
var key2 = process.argv[3];

/* creating heading for the log entry */
if (key2 === undefined) {
    key2 = "The Sign Ace of Base"; // passing default song if the user doesn't enter any song
}
if (key1 === "do-what-it-says") {
    key2 = "";
}
text = "\n" + moment().format("MM/DD/YYYY HH:mm") + ", " + key1 + ", " + key2 + '\n';
logEntry(text);

/* switch to different action based on user input i.e. process.argv[2] */
switch (key1) {
    case "concert-this":
        concertThis()
        break;

    case "spotify-this-song":
        spotifyCall();
        break;

    case "movie-this":
        movieThis()
        break;

    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            // grab the name of the song and then call spotify
            var dataArr = data.split(",");
            key2 = dataArr[1];
            spotifyCall();
        });
        break;

    default:
        console.log("Invalid Input");
}

/* concert this function */
function concertThis() {
    var queryURL = "https://rest.bandsintown.com/artists/" + key2 + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var theLocation = response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country
                console.log("Name of the venue: " + response.data[i].venue.name);
                console.log("Venue location: " + theLocation);
                console.log("Date of the Event: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("-------------");

                /* creating details for the log entry */
                text = response.data[i].venue.name + ", " + theLocation + ", " + moment(response.data[i].datetime).format("MM/DD/YYYY") + '\n';
                logEntry(text);
            }
        }
    );
}

/* movie this function */
function movieThis() {
    var queryURL = "http://www.omdbapi.com/?t=" + key2.replace(" ", "-") + "&y=&plot=short&apikey=trilogy";
    axios.get(queryURL).then(
        function (response) {
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMDB Rating of the movie: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log("Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);

            /* creating details for the log entry */
            text = response.data.Title + ", " + response.data.Year + ", " + response.data.imdbRating + ", " + response.data.Ratings[1].Value + ", " + response.data.Country + ", " + response.data.Language + ", " + response.data.Plot + ", " + response.data.Actors + '\n';
            logEntry(text);
        }
    );
}

/* spotify call */
function spotifyCall() {
    spotify
        .search({
            type: 'track',
            query: key2
        })
        .then(function (response) {
            var artists = "";
            for (var j = 0; j < response.tracks.items[0].album.artists.length; j++) {
                if (artists === "") {
                    artists = response.tracks.items[0].album.artists[j].name
                } else {
                    artists = artists + ", " + response.tracks.items[0].album.artists[j].name
                }
            }
            console.log("Artists: " + artists);
            console.log("Name of the Song: " + response.tracks.items[0].name);
            console.log("Preview URL: " + response.tracks.items[0].preview_url);
            console.log("Name of the Album: " + response.tracks.items[0].album.name);

            /* creating details for the log entry */
            text = artists + ", " + response.tracks.items[0].name + ", " + response.tracks.items[0].preview_url + ", " + response.tracks.items[0].album.name + '\n';
            logEntry(text);
        })
        .catch(function (err) {
            console.log(err);
        });
}

/* function to update the log file */
function logEntry(lineText) {
    fs.appendFile("log.txt", lineText, function (err) {

        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }

    });
}