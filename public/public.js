let bodyDiv = document.getElementById('body') //hämtar bodydiven

let saveToDoBtn = document.createElement('button') //skapar knapp
let saveToDoText = document.createElement('h4') // skapar h4
saveToDoText.innerText = "Spara" //skriver text på knapp

bodyDiv.appendChild(saveToDoBtn)
saveToDoBtn.appendChild(saveToDoText)

saveToDoBtn.onclick = async function() { //onclick funktion
    let taskInput = document.getElementById('someValue').value
    console.log(taskInput)
    const status = await makeRequest("http://localhost:3000/api", "POST", {fruit: "Äpple", brand: "granny smith", Price: "22"})
    console.log(status)
}

//---------------HÄMTAR---------------------------------------------

let getToDoBtn = document.createElement('button') //skapar knapp
let getToDoText = document.createElement('h4') // skapar h4
getToDoText.innerText = 'Hämtar ToDo' //skriver text på knapp

bodyDiv.appendChild(getToDoBtn)
getToDoBtn.appendChild(getToDoText)

getToDoBtn.onclick = async function() { //onclick funktion 
    const displayToDo = await makeRequest("http://localhost:3000/api", "GET")

    const toDoText = document.getElementsByTagName('h2')[0]
    toDoText.innerText = displayToDo

    

}

//---------------INPUT--------------------------------

/* let input = document.createElement('input')
let placeHolder = document.createElement('placeholder')
placeHolder.innerText = "Vad ska du göra idag?"

bodyDiv.appendChild(input)
input.appendChild(placeHolder)

function input() {

} */

async function makeRequest(url, method, body) {
    try {
        const response = await fetch(url, {
            headers: {"Content-Type": "application/json"},
            method,
            body: JSON.stringify(body)
        })
        console.log(response)
        const result = await response.json()
        return result
    }catch(err) {
        console.error(err)
    }
}