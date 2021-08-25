//SERVER
const fs = require('fs');
const express = require('express')
const server = express()
const port = 3000

server.use(express.json())

server.get('/api', (req, res) => {
  let raw = fs.readFileSync("todos.json") //hämtar url till jsonfil
  let todoItem = JSON.parse(raw)
  res.json(todoItem)
})

server.post('/api', (req, res) => {
  try {
    let raw = fs.readFileSync("todos.json") //hämtar url till jsonfil
    let todoItem = JSON.parse(raw)
    todoItem.push(req.body)
    fs.writeFileSync("todos.json", JSON.stringify(todoItem))
    res.json(true)


  } catch(err) {
    console.error(err)
    res.status(500).json(false)
  }
})

server.use(express.static('public'))

server.listen(port, () => console.log('Applikationen fungerar'))