import { Server as SocketServer, Socket } from 'socket.io'
import { Server as httpServer } from 'http'
import { addLiveNotificationMsgTODatabase, fetchNotifications, addNormalNotificationMsgTODatabase, markNotificationAsRead } from '../services/notification/notification.service'
import { onlineUserDTO } from '../helpers/interfaces/user.dtoo'
import { notification } from '../helpers/interfaces/notifications.dto'
import { user } from '../helpers/interfaces/user.dtoo'

export default (server: httpServer) => {

    const io = new SocketServer(server, {
        cors: { origin: '*' }
    })

    io.on('connection', (socket: Socket) => {

        socket.on('join_multiple_course_rooms', (rooms) => {
            socket.join(rooms)
        })

        socket.on('fetch_notifications', async (data: onlineUserDTO) => {
            await fetchNotifications(data)
                .then((response) =>socket.emit('fetch_notifications:response',response))
                .catch((err) => socket.emit('fetch_notifications:error',err))
        })

        socket.on('add_normal_notification', async (body: notification) => {
            socket.join(body.courseData._id)
            addNormalNotificationMsgTODatabase(body).then((response => {
                socket.broadcast.to(body.courseData._id).emit('new_notification_alert', response)
            }))
        })

        socket.on('mark_notifications_asread', ({ notificationList, user }: { notificationList: Array<string>, user: user }) => {
            markNotificationAsRead(notificationList, user)
        })
    })
}