// Naming conventions:
// 1 - regular variables start with lowercase
// 2 - constructors start with capitals

var axios = require("axios");
// var Spotify = require('node-spotify-api');
// var spotifyKeys = new Spotify(keys.Spotify);
var moment = require("moment")
var dotEnv = require("DotEnv").config()
var keys = require("./keys.js");


// Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`


function concertThis() {
  console.log("its a function!")

  var artistName = "rihanna";
  var queryUrl = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=codingbootcamp`
  console.log(queryUrl);

  axios.get(queryUrl).then(
    function (response) {
      console.log(response)
    }
  )
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
      else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
    )
}

concertThis()


// function spotifyThis() {

// }

// function movieThis() {

// }

// function doWhatItSays() {

// }