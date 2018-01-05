const express = require('express')
const request = require('request')
const morgan = require('morgan');
const { API_BASE_URL, PORT } = require('./config')

const app = express()

app.use(morgan('dev'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})

app.use('/api/v1', (req, res) => {
  const url = API_BASE_URL + req.url
  req.pipe(request(url)).pipe(res)
})

app.use('/', function(req, res) {
  res.writeHead(200)
  res.end('OK')
})

app.listen(PORT || 5000)