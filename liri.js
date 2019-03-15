require("dotenv").config();
var axios = require("axios");
var moment = require("moment");
var date = moment("2019-07-24T12:00:00").format( "MM/DD/YYYY");
console.log( date)

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var key1 = process.argv[2];
var key3 = process.argv[3];

switch (key1) {
    case "concert-this":
        axios.get("https://rest.bandsintown.com/artists/" + key3.replace(" ", "-") + "/events?app_id=codingbootcamp").then(
            function (response) {
                for (var i=0; i < response.data.length; i++){
                    var theLocation = response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country
                    console.log( "Concert #" + i.toString().trim());
                    console.log( "Name of the venue: " + response.data[i].venue.name);
                    console.log( "Name of the venue: " + theLocation);
                    console.log( "Name of the venue: " + response.data[i].datetime);
                }
            }
        );
        break;
    case "spotify-this-song":
        console.log("spotify-this-song " + key3);
        break;
    case "movie-this":
        axios.get("http://www.omdbapi.com/?t=" + key3.replace(" ", "-") + "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                console.log(response);
                console.log("Title of the movie: " + response.data.Title);
                console.log("Year the movie came out: " + response.data.Year);
                console.log("IMDB Rating of the movie: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
                console.log("Country where the movie was produced: " + response.data.Country);
                console.log("Language of the movie: " + response.data.Language);
                console.log("Plot of the movie: " + response.data.Plot);
                console.log("Actors in the movie: " + response.data.Actors);
            }
        );
        break;
    case "do-what-it-says":
        console.log("do-what-it-says ");
        break;
    default:
        console.log("Invalid Input");
}