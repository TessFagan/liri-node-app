
require("DotEnv").config()
var axios = require("axios");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var spotifyKeys = new Spotify(keys.Spotify);
var moment = require("moment")


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
  spotifyKeys.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err + `"The Sign by Ace of Base"`);

    }
    console.log(data.tracks.items);
    var songs = data.tracks.items
    songs.forEach(Object => {
      let artistName = Object.artists[0].name
      let songName = Object.name
      let previewLink = Object.preview_url
      let album = Object.album.name

      console.log(`\n${artistName}`)
      console.log(previewlink)
      console.log(album)
    })

  });


  // Artist(s)

  // * The song's name

  // * A preview link of the song from Spotify

  // * The album that the song is from



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


      console.log(`\n${movieName}`)
      console.log(movieYear)
      console.log(movieIMDB)
    })

    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range
        console.log(error.response.data);
      }
    })
}


  // Title of the movie.
  // * Year the movie came out.
  // * IMDB Rating of the movie.
  // * Rotten Tomatoes Rating of the movie.
  // * Country where the movie was produced.
  // * Language of the movie.
  // * Plot of the movie.
  // * Actors in the movie.

}

function doWhatItSays() {

}