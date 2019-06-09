// Naming conventions:
// 1 - regular variables start with lowercase
// 2 - constructors start with capitals

var axios = require("axios");
var Spotify = require('node-spotify-api');
var spotifyKeys = new Spotify(keys.spotify);
var moment = require("moment")
var dotEnv = require("DotEnv").config()
var keys = require("./keys.js");


// Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`