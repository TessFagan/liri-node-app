
require("DotEnv").config()
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotifyKeys = new Spotify(keys.Spotify);
var moment = require("moment")
var fs = require("fs")



// Make it so liri.js can take in one of the following commands:

//    * `concert-this`

//    * `spotify-this-song`

//    * `movie-this`

//    * `do-what-it-says`


let type = process.argv[2]
let input = process.argv[3]

function chooseAPI(type, input) {
  switch (type) {
    case "concert-this":
      return concertThis(input);
    case "spotify-this-song":
      return spotifyThis(input);
    case "movie-this":
      return movieThis(input);
    case "do-what-it-says":
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


function spotifyThis(input) {
  spotifyKeys.search({ type: 'track', query: `${input}` }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);

    }
    console.log(data.tracks.items);
    var songs = data.tracks.items
    songs.forEach(song => {
      let artistName = song.artists[0].name
      let songName = song.name
      let previewLink = song.album.preview_url
      let album = song.album.name

      console.log(`\n${artistName}`);
      console.log(`Song Name: ${songName}`);
      console.log(`Preview link: ${previewLink}`);
      console.log(`Album Name: ${album}`);
    })

  });

}

function movieThis(input) {
  var queryUrl = `http://www.omdbapi.com/?apikey=trilogy&t=${input}`

  axios.get(queryUrl)
    .then(function (response) {
      var movie = response.data
      let movieName = movie.Title
      let movieYear = movie.Year
      let movieIMDB = movie.imdbRating
      let movieRotten = movie.Ratings[1].Value
      let movieCountry = movie.Country
      let movieLang = movie.Language
      let moviePlot = movie.Plot
      let movieActors = movie.Actors

      console.log(`\n${movieName}`)
      console.log(movieYear)
      console.log(movieIMDB)
      console.log(movieRotten)
      console.log(movieCountry)
      console.log(movieLang)
      console.log(moviePlot)
      console.log(movieActors)
    })

    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range
        console.log(error.response.data);
      }
    })
}


function doWhatItSays() {



  fs.readFile('random.txt', 'utf8', function (error, data) {
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);
    let type = dataArr[0]
    let input = dataArr[1]
    chooseAPI(type, input)
  });

}