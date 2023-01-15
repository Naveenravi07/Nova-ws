import { Server as SocketServer, Socket } from 'socket.io'
import { Server as httpServer } from 'http'


export default (server: httpServer) => {

    const io = new SocketServer(server, {
        cors: { origin: '*' }
    })

    io.on('connection', (socket: Socket) => {

    })
}