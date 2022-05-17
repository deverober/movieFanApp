var express = require('express');
var router = express.Router();
const request = require('request')

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8'
const apiBaseUrl = 'http://api.themoviedb.org/3';
const nowPlayingUrl = `${apiBaseUrl}/movie/now_playing?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl
  next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
  /*
    Takes two arguments, the URL and a callback to run when the response is back.
    The callback takes 3 arguments: 1. Error (if any), 2. the whole http response, 3. json/data the server sent back
  */
  request.get(nowPlayingUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData)

    // res.json(parsedData)
    res.render('index', { parsedData: parsedData.results })
  })
});

router.get('/movie/:id', (req, res) => {
  const movieId = req.params.id
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`

  request.get(thisMovieUrl, (error, response, movieData) => {
    const parsedData = JSON.parse(movieData)

    res.render('single-movie', {
      parsedData
    })
  })
})

module.exports = router;
