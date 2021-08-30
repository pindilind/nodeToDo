

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

async function getTodo() { //onclick funktion 
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
    }
}

getToDoBtn.onclick = getTodo


let deleteBtn = document.createElement("button")
let btnText = document.createElement("h3")
btnText.innerText = "Ta bort"

bodyDiv.appendChild(deleteBtn)
deleteBtn.appendChild(btnText)


async function deleteTodo(id) { //onclick funktion 
  
    if(id != null) {
        console.log(id)
    }

    const status = await makeRequest("http://localhost:3000/api", "DELETE", {id})
    console.log(status)

    getTodo()
}

deleteBtn.onclick = deleteTodo


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