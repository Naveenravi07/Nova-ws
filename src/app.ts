import http from 'http'
import socketIo from './core/socketIo';
import connectDb from './config/database';

const server = http.createServer();
connectDb()
socketIo(server)

server.listen(4000, () => {
    console.log("Server Is Running In Port 4000");
})