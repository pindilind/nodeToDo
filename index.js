//SERVER
const fs = require('fs');
const express = require('express')
const server = express()
const port = 3000

server.use(express.json())

server.get('/api', (req, res) => {
  let raw = fs.readFileSync("todos.json") //hämtar url till jsonfil
  let todoItems = JSON.parse(raw)
  res.json(todoItems)
})

server.post('/api', (req, res) => {
  try {
    let raw = fs.readFileSync("todos.json") //hämtar url till jsonfil
    let todoItems = JSON.parse(raw)
    console.log(todoItems)
    console.log(todoItems.length)
    let id = 0
    let length = todoItems.length

    if(length > 0) {
      id = todoItems[length - 1].id + 1
    }
    
    let newTodoItem = {id: id, todoItem: req.body.todoItem}
    todoItems.push(newTodoItem)
    fs.writeFileSync("todos.json", JSON.stringify(todoItems))
    res.json(true)


  } catch(err) {
    console.error(err)
    res.status(500).json(false)
  }
})

server.delete('/api', (req, res) => {
  let id = req.body
  console.log(id)
  let raw = fs.readFileSync("todos.json") //hämtar url till jsonfil
  let todoItems = JSON.parse(raw)

  if(id.id == null) {
    console.log("listan ska rensas")
  }else {
    console.log("item med ID ska tas bort")
  }

  try {
  fs.writeFileSync("todos.json", JSON.stringify(todoItems))
  res.json(true)


  } catch(err) {
    console.error(err)
    res.status(500).json(false)
  }
  
})

server.use(express.static('public'))

server.listen(port, () => console.log('Applikationen fungerar'))