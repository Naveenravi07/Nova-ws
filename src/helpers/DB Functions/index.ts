import notificationModel from "../../models/notifications"
import { onlineUserDTO } from "../interfaces/user.dtoo"
import { notification } from '../interfaces/notifications.dto'
import { Server } from 'socket.io'

const addNotificationMsgToDb = async (body: notification, io: Server) => {

    const activeUsers: onlineUserDTO[] = await io.in(body.allianceData._id).fetchSockets().then((sockets) => sockets.map((soc: any) => JSON.parse(soc.handshake.query.auth)))
    const title = `${body.user.userName} Joined ${body.allianceData.name}`
    body.allianceData.students.map((student) => {
        student.seen = false
        delete student.JoinDate
        if (activeUsers.find((user) => user.userId == student.id)) student.seen = true
    })
    return new notificationModel({ userId: body.user.id, allianceId: body.allianceData._id, title: title, recipient: body.allianceData.students, type: body.type }).save()
}

const fetchNotifications = async (data: onlineUserDTO) => {
    const notifications = await notificationModel.find({ recipient: { $elemMatch: {id: data.userId } } })
    return notifications
}

export { addNotificationMsgToDb, fetchNotifications }