import notificationModel from "../../models/notifications"
import { onlineUserDTO } from "../interfaces/user.dtoo"
import { notification } from '../interfaces/notifications.dto'
import { Server } from 'socket.io'

const addLiveNotificationMsgTODatabase = async (body: notification, io: Server) => {

    const activeUsers: onlineUserDTO[] = await io.in(body.allianceData._id)
    .fetchSockets().then((sockets) => sockets
    .map((soc: any) => soc.handshake.query))

    //Deleting id of intercation creator from notification list
    const ownerIndex = body.allianceData.students.findIndex((s1) => s1.id == body.user.id)
    if (ownerIndex > -1) delete body.allianceData.students[ownerIndex]
    body.allianceData.students.map((student) => {
        student.seen = false
        delete student.JoinDate
        if (activeUsers.find((user) => user.userId == student.id)) student.seen = true
    })

    //Preventing null objects ==>
    const filterdRecipients = body.allianceData.students.filter(student => student)
    return new notificationModel({ userId: body.user.id, allianceId: body.allianceData._id, title: body.title, recipient: filterdRecipients, type: body.type, allianceName: body.allianceData.name, userName: body.user.userName, description: body.description }).save()
}


const addNormalNotificationMsgTODatabase = async (body: notification,) => {

    //Deleting id of intercation creator from notification list
    const ownerIndex = body.allianceData.students.findIndex((s1) => s1.id == body.user.id)
    if (ownerIndex > -1) delete body.allianceData.students[ownerIndex]
    body.allianceData.students.map((student) => {
        student.seen = false
        delete student.JoinDate

    })
    //Preventing null objects ==>
    const filterdRecipients = body.allianceData.students.filter(student => student)
    return new notificationModel({ userId: body.user.id, allianceId: body.allianceData._id, title: body.title, description:body.description, recipient: filterdRecipients, type: body.type, allianceName: body.allianceData.name, userName: body.user.userName }).save()

}


const fetchNotifications = async (data: onlineUserDTO) => {
    const notifications = await notificationModel.find({ recipient: { $elemMatch: { id: data.userId } } })
    return notifications
}

export {
    addLiveNotificationMsgTODatabase,
    fetchNotifications,
    addNormalNotificationMsgTODatabase
}