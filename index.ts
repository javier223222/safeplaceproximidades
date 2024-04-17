import { createServer } from "http"
import server from "./src/server"
import "dotenv/config"
import { Server } from "socket.io"
import getdata from "./src/handlers/proximidadhandler"
import verifyTokenio from "./src/middlewares/socketio/index"
const httpserver=createServer(server)
httpserver.listen(process.env.PORT||3000,()=>{
    console.log("Server is running " + 'http://localhost:' + process.env.PORT||3000)
})

const io =new Server(httpserver,{
    cors:{
        origin:"*"
    },
    pingInterval:1000,
    pingTimeout:2000,

})

const onConnection = (socket:any) => {
    console.log("new connection")
    getdata(io,socket)
    
}

io.of("/proximidad").on("connection",onConnection)
// .use(verifyTokenio)

// Configuración del cliente MQTT
