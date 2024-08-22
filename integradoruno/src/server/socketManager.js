import messageModel from "../dao/models/message.model.js";

const socketManager = (socketServer) => {

    let messages = []

    socketServer.on('connection', socket => {
        socket.on('message', data => {
            console.log(`mensaje recibido ${data}`)
            messages.push(data)
            socketServer.emit('messageLogs', messages)
        })
    
        socket.on("getUsername", async (username) => {
            const findUser = await messageModel.findOne({user: username});
    
            if (!findUser) {
                console.log("El user no existe");
                const user = await messageModel.create({
                    user: username,
                    message: `Bienvenido al chat ${username}!`
                });
                
                socket.emit("message", user);
            } else {
                socket.emit("message", findUser);
            }
        });
    })

}

export default socketManager;