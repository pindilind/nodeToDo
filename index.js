//SERVER
const fs = require('fs');
const express = require('express')
const server = express()
const port = 3000


server.use(express.json())

server.get('/api', (req, res) => {
  let raw = fs.readFileSync("fruits.json") //hämtar url till jsonfil
  let fruits = JSON.parse(raw)
  res.json(fruits)
})

server.post('/api', (req, res) => {
  try {
    let raw = fs.readFileSync("fruits.json") //hämtar url till jsonfil
    let fruits = JSON.parse(raw)
    fruits.push(req.body)
    fs.writeFileSync("fruits.json", JSON.stringify(fruits))
    res.json(fruits)

  } catch(err) {
    console.error(err)
  }
})

server.use(express.static('public'))

server.listen(port, () => console.log('Applikationen fungerar'))