const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const { v4: uuidv4  } = require('uuid')
const path = require('path')
const request = require('request')
const cookieParser = require('cookie-parser')

dotenv.config()

const port = process.env.PORT || 5000

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET
const hostURL = process.env.HOST_URL || 'http://localhost:3000'

const app = express()

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(cookieParser())


app.use(express.static(path.join(__dirname, '../build')))


app.get('/api/v1/auth/login', (req, res) => {
  const scope = 'streaming \
                 user-read-email \
                 user-read-private'

  const state = uuidv4()

  const authQueryParameters = new URLSearchParams({
    response_type: 'code',
    client_id: spotifyClientId,
    scope,
    redirect_uri: `${hostURL}/api/v1/auth/callback`,
    state
  })

  res.redirect(`https://accounts.spotify.com/authorize/?${authQueryParameters.toString()}`)
})

app.get('/api/v1/auth/callback', (req, res) => {
  const code = req.query.code

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: `${hostURL}/api/v1/auth/callback`,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64')),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    json: true
  }

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.cookie('SPOTIFY_ACCESS_TOKEN', body.access_token, { httpOnly: true, maxAge: body.expires_in * 1000, secure: true })
      // TODO: Implement refresh flow
      res.cookie('SPOTIFY_REFRESH_TOKEN', body.refresh_token, { httpOnly: true, maxAge: body.expires_in * 2000, secure: true })
      res.redirect('http://localhost:3000/')
    }
  })
})

app.get('/api/v1/auth/token', (req, res) => {
  res.json(
    {
      access_token: req.cookies.SPOTIFY_ACCESS_TOKEN
    }
  )
})

app.get('/api/v1/search', (req, res) => {
  const search_query_parameters = new URLSearchParams({
    type: 'album,artist,track',
    ...req.query
  })

  const access_token = req.cookies.SPOTIFY_ACCESS_TOKEN

  const searchOptions = {
    url: `https://api.spotify.com/v1/search?${search_query_parameters.toString()}`,
    headers: {
      'Authorization': `Bearer ${access_token}`
    }
  }

  request.get(searchOptions, function(error, response, body) {
    res.status(response.statusCode).json(body)
  })
})

app.put('/api/v1/me/player/play', jsonParser,(req, res) => {
  const access_token = req.cookies.SPOTIFY_ACCESS_TOKEN
  
  const playOptions = {
    url: `https://api.spotify.com/v1/me/player/play?device_id=${req.query.device_id}`,
    headers: {
      'Authorization': `Bearer ${access_token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }

  request.put(playOptions, function(error, response, body) {
    res.status(response.statusCode).json(body)
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

