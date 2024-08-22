const socket = io()

let user
let chatBox = document.getElementById("chatBox")

Swal.fire({
    title: "Identificate",
    input: "text",
    text:"Ingresa tu nombre de usuario",
    inputValidator:(value)=>{
        return !value && "Necesitas identificarte para ingresar a la sala"
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value
    socket.emit("getUsername", user);
    const span = document.getElementById("user-name");
    span.innerHTML = user;
})

chatBox.addEventListener("keyup", evt=>{
    if (evt.key === "Enter"){
        if (chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value})
            chatBox.value = ""
        }
    }
})

socket.on("messageLogs", data => {
    let log = document.getElementById("messageLogs")
    let messages = ""
    data.forEach(message => {
        messages =  messages + `<strong>${message.user}</strong>  dice: ${message.message}</br>`
    })
    log.innerHTML = messages
})

const boton = document.getElementById('btn-send')
boton.addEventListener('click',  evt=>{
        if (chatBox.value.trim().length > 0){
            socket.emit("message", {user: user, message: chatBox.value})
            chatBox.value = ""
        }
})
