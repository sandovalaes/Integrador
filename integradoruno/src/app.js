import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import indexRouter from './routes/index.router.js'
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/carts.router.js";
import chatRouter from "./routes/chat.router.js";
import messageRouter from "./routes/messages.router.js";
import { Server } from 'socket.io';
import socketManager from "./server/socketManager.js"

const app = express();
const PORT = 8080;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hbs = handlebars.create({
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
});

app.engine('handlebars',  hbs.engine)
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

console.log(__dirname)

app.use('/', indexRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

mongoose
    .connect(
    "mongodb+srv://sandovalaes:Tomate24-@cluster0.dzl00.mongodb.net/ecommerce?"
    )
    .then(() => {
    console.log("Conectado a la base de datos");
    })
    .catch((error) => console.error("Error en la conexion", error));

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor corriendo sobre el puerto ${PORT}`);
});

const socketServer = new Server(httpServer)
socketManager(socketServer);
