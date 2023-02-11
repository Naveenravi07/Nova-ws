import notificationModel from "../../models/notifications"
import { onlineUserDTO } from "../interfaces/user.dtoo"
import { notification } from '../interfaces/notifications.dto'

const addNotificationMsgToDb = (body: notification, onlineUsers: onlineUserDTO[]): any => {
    
    onlineUsers = onlineUsers.map((user: any) => user = JSON.parse(user))
    body.allianceData.students.map((student) => {
        student.seen = false
        delete student.JoinDate
        const onlineCheck = onlineUsers.find((user) => user.userId == student.id)
        if (onlineCheck) student.seen = true
    })
    return new notificationModel({ userId: body.user.id, allianceId: body.allianceData._id, title: body.title, recipient: body.allianceData.students, type: body.type }).save()
}

const fetchNotifications = async (data: onlineUserDTO) => {
    const notifications = await notificationModel.find({ recipient: { $elemMatch: { seen: false, id: data.userId } } })
    return notifications
}

export { addNotificationMsgToDb, fetchNotifications }