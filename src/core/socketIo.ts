import { Server as SocketServer, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import { addLiveNotificationMsgTODatabase, fetchNotifications, addNormalNotificationMsgTODatabase ,markNotificationAsRead} from '../helpers/DB Functions'
import { onlineUserDTO } from '../helpers/interfaces/user.dtoo'
import { notification } from '../helpers/interfaces/notifications.dto'
import { user } from '../helpers/interfaces/user.dtoo'

export default (server: httpServer) => {

    const io = new SocketServer(server, {
        cors: { origin: '*' }
    })

    io.on('connection', (socket: Socket) => {

        socket.on('join_multiple_alliance_rooms', (rooms) => {
            socket.join(rooms)
        })

        socket.on('fetch_notifications', async (data: onlineUserDTO, callback: Function) => {
            const noti = await fetchNotifications(data)
            callback(noti)
        })

        socket.on('add_normal_notification', async (body: notification) => {
            socket.join(body.allianceData._id)
            addNormalNotificationMsgTODatabase(body).then((response => socket.broadcast.to(body.allianceData._id).emit('new_notification_alert', response)))
        })

        socket.on('mark_notifications_asread', ({ notificationList, user }: { notificationList: Array<string> , user: user}) => {
            markNotificationAsRead(notificationList,user)
        })
    })
}