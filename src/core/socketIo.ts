import { Server as SocketServer, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import { addNotificationMsgToDb, fetchNotifications } from '../helpers/DB Functions'
import { onlineUserDTO } from '../helpers/interfaces/user.dto'

export default (server: httpServer) => {

    const io = new SocketServer(server, {
        cors: { origin: '*' }
    })

    io.on('connection', (socket: Socket) => {

        socket.on('alc_new_member_join', async (body) => {
            socket.join(body.allianceData._id)
            const activeUsers: any = await io.in(body.allianceData._id).fetchSockets()
            const title = `${body.user.userName} Joined ${body.allianceData.name}`
            addNotificationMsgToDb({ ...body, title: title }, activeUsers.map((soc: any) => soc.handshake.query.auth))
            socket.broadcast.to(body.allianceData._id).emit('alc_new_member_join_alert', title)
        })

        socket.on('join_multiple_alliance_rooms', (rooms) => {
            socket.join(rooms)
        })

        socket.on('fetch_notifications',async(data:onlineUserDTO,callback:Function)=>{
            const noti = await fetchNotifications(data)
            console.log(noti);
            callback(noti)
        })
    })
}