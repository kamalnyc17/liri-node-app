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
text = "\n" + moment().format("MM/DD/YYYY HH:mm") + ", " + key1 + ", " + key2 + '\n';
logEntry(text);

/* switch to different action based on user input i.e. process.argv[2] */
switch (key1) {
    case "concert-this":
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
        break;

    case "spotify-this-song":
        spotify
            .search({
                type: 'track',
                query: key2
            })
            .then(function (response) {
                for (var i = 0; i < response.tracks.items.length; i++) {
                    if (response.tracks.items[i].name.toUpperCase() === key2.toUpperCase()) {
                        var artists = "";
                        for (var j = 0; j < response.tracks.items[i].album.artists.length; j++) {
                            if (artists === "") {
                                artists = response.tracks.items[i].album.artists[j].name
                            } else {
                                artists = artists + ", " + response.tracks.items[i].album.artists[j].name
                            }
                        }
                        console.log(artists);
                        console.log("Name of the Song: " + response.tracks.items[i].name);
                        console.log("Preview URL: " + response.tracks.items[i].preview_url);
                        console.log("Name of the Album: " + response.tracks.items[i].album.name);
                    }
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        break;

    case "movie-this":
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
        break;

    case "do-what-it-says":
        console.log("do-what-it-says ");
        break;

    default:
        console.log("Invalid Input");
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