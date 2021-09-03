

let bodyDiv = document.getElementById('body') //hämtar bodydiven

let saveToDoBtn = document.createElement('button') //skapar knapp
let saveToDoText = document.createElement('h4') // skapar h4
saveToDoText.innerText = "Spara" //skriver text på knapp

bodyDiv.appendChild(saveToDoBtn)
saveToDoBtn.appendChild(saveToDoText)

saveToDoBtn.onclick = async function () { //onclick funktion

    let taskInput = document.getElementById('someValue').value
    console.log(taskInput)

    const status = await makeRequest("http://localhost:3000/api", "POST", {
        todoItem: taskInput
    })
    console.log(status)

}

//---------------HÄMTAR---------------------------------------------

let getToDoBtn = document.createElement('button') //skapar knapp
let getToDoText = document.createElement('h4') // skapar h4
getToDoText.innerText = 'Hämtar ToDo' //skriver text på knapp

bodyDiv.appendChild(getToDoBtn)
getToDoBtn.appendChild(getToDoText)

/* async function getTodo() { //onclick funktion 
    const displayToDo = await makeRequest("http://localhost:3000/api", "GET")
    console.log(displayToDo)
    
    document.getElementById('toDoDiv').innerHTML = ""

    for (let i = 0; i < displayToDo.length; i++) {
        const element = document.createElement('li')
        element.innerText = displayToDo[i].todoItem
        console.log(displayToDo[i])

        element.onclick = function() {
            let id = displayToDo[i].id

            deleteTodo(id)
        }

        document.getElementById('toDoDiv').appendChild(element)
        /* toDoText.innerText = element. */
/*   }
}  */
getToDoBtn.onclick = getTodo


let deleteBtn = document.createElement("button")
let btnText = document.createElement("h3")
btnText.innerText = "Ta bort"

bodyDiv.appendChild(deleteBtn)
deleteBtn.appendChild(btnText)


async function deleteTodo(id) { //onclick funktion 

    if (id != null) {
        console.log(id)
    }

    const status = await makeRequest("http://localhost:3000/api", "DELETE", { id })
    console.log(status)

    getTodo()
}

deleteBtn.onclick = function () {
    deleteTodo()
}


let putBtn = document.createElement("button")
let putText = document.createElement("h3")
putText.innerText = "Ändra"

bodyDiv.appendChild(putBtn)
putBtn.appendChild(putText)

putBtn.onclick = changeItem

function changeItem(id) {


}



async function getTodo(id) { //onclick funktion 

    console.log('id in getTodo: ' + JSON.stringify(id))

    // hämta listan eller enstaka todoItem
    const displayToDo = await makeRequest("http://localhost:3000/api", "GET")
    console.log(displayToDo)

    const todoDiv = document.getElementById('toDoDiv')

    //töm diven
    todoDiv.innerHTML = ""

    for (let i = 0; i < displayToDo.length; i++) {
        console.log(i)
        const id = displayToDo[i].id
        const listItem = document.createElement('li')
        const textElement = document.createElement('input')
        textElement.value = displayToDo[i].todoItem
        textElement.disabled = true
        const changeTodoItem = document.createElement('button')
        changeTodoItem.innerText = 'Ändra'
        changeTodoItem.onclick = () => {
            console.log('Ändra todoItem med id ' + id)
            textElement.disabled = false
            changeTodoItem.innerText = 'Spara ändring'
            changeTodoItem.onclick = () => {
                /* updateTodo(id, textElement.value) */

                updateTodo(id, textElement.value)
            }
        }
        const deleteTodoItem = document.createElement('button')
        deleteTodoItem.innerText = 'Ta bort'
        deleteTodoItem.onclick = function () {
            let id = displayToDo[i].id
            deleteTodo(id)
        }

        listItem.appendChild(textElement)
        listItem.appendChild(changeTodoItem)
        listItem.appendChild(deleteTodoItem)


        todoDiv.appendChild(listItem)
        /* toDoText.innerText = element. */
    }
}

async function updateTodo(id, newText) {

    const result = await makeRequest("http://localhost:3000/api/" + id, "PUT", {newText: newText})
    console.log(result)
    
}

let getOneItemBtn = document.createElement("button")
let getOneText = document.createElement("h3")
getOneText.innerText = "Hämta 1"

bodyDiv.appendChild(getOneItemBtn)
getOneItemBtn.appendChild(getOneText)

getOneItemBtn.onclick = getOneItem

function getOneItem() {

}

async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json"
            },
            method,
            body: JSON.stringify(body)
        })
        console.log(response)
        const result = await response.json()
        return result
    } catch (err) {
        console.error(err)
    }
}