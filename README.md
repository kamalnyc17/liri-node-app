# LIRI-Node-App
## Node.JS Project

![Homepage](https://github.com/kamalnyc17/liri-node-app/blob/master/images/homepage.jpg)

## Overview
In this project, we have created LIRI. LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. LIRI will search Spotify for songs, Bands in Town for concerts, and OMDB for movies based on user's parameters.

## concert-this
### COMMAND: node liri.js concert-this '<artist/band name here>'
This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
1. Name of the venue
2. Venue location
3. Date of the Event (MomentJS will format this as "MM/DD/YYYY")
Screenshot of the result:
![concert-this](https://github.com/kamalnyc17/liri-node-app/blob/master/images/concert-this.jpg)

## spotify-this-song
### COMMAND: node liri.js spotify-this-song '<song name here>'
This will search the Spotify API for an artist and render the following information to the terminal:
1. Artist(s)
2. The song's name
3. A preview link of the song from Spotify
4. The album that the song is from

**(if the user doesn't enter the song name, the program will default to "The Sign" by Ace of Base.)**

Screenshot of the result:
![spotify-this-song](https://github.com/kamalnyc17/liri-node-app/blob/master/images/spotify-this-song.jpg)




