
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


let type = process.argv[2]
let input = process.argv[3]

function chooseAPI(type, input) {
  switch (type) {
    case "concertThis":
      return concertThis(input);
    case "spotifyThis":
      return spotifyThis(input);
    case "movieThis":
      return movieThis(input);
    case "doWhatItSays":
      return doWhatItSays(input);
  }
}
chooseAPI(type, input)


function concertThis(input) {
  var queryUrl = `https://rest.bandsintown.com/artists/${input}/events?app_id=codingbootcamp`

  axios.get(queryUrl)
    .then(function (response) {
      var concert = response.data
      concert.forEach(Object => {
        let venueName = Object.venue.name
        let venueLocation = Object.venue.city + ", " + Object.venue.country
        let venueTime = moment(Object.datetime).format('MMMM Do YYYY')
        console.log(`\n${venueName}`)
        console.log(venueLocation)
        console.log(venueTime)
      })
    })

    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range
        console.log(error.response.data);
      }
    })
}


function spotifyThis() {

}

function movieThis() {

}

function doWhatItSays() {

}


// concert.forEach(Element => {
//   let venueName = Element.venue.name
//           let venueLocation = `${element.venue.country} + ${element.venue.region}+ ${element.venue.city}`
//           console.log(venueLocation)})