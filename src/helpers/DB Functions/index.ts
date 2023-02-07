import notificationModel from "../../models/notifications"
import { notificationDto } from "../interfaces/notification.dto"
import { onlineUserDTO } from "../interfaces/user.dto"


const addNotificationMsgToDb = (body: notificationDto, onlineUsers: Array<onlineUserDTO>): any => {

    onlineUsers = onlineUsers.map((user: any) => {
        user = JSON.parse(user)
        return user
    })

    body.allianceData.students.map((student: any, index: number) => {
        student.seen = false
        const onlineCheck = onlineUsers.find((user) => user.userId == student.id)
        if (onlineCheck) {
            student.seen = true
        }
    })
    
    return new notificationModel({ userId: body.user.userId, allianceId: body.allianceData._id, title: body.title, recipient: body.allianceData.students }).save()
}

export { addNotificationMsgToDb }