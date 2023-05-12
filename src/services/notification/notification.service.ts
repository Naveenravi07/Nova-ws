import notificationModel from "../../models/notifications"
import { onlineUserDTO, user } from "../../helpers/interfaces/user.dtoo"
import { notification } from '../../helpers/interfaces/notifications.dto'
import { Server } from 'socket.io'

const addLiveNotificationMsgTODatabase = async (body: notification, io: Server) => {

    const activeUsers: onlineUserDTO[] = await io.in(body.courseData._id)
    .fetchSockets().then((sockets) => sockets
    .map((soc: any) => soc.handshake.query))

    //Deleting id of intercation creator from notification list
    const ownerIndex = body.courseData.subscribers.findIndex((s1) => s1.id == body.user.id)
    if (ownerIndex > -1) delete body.courseData.subscribers[ownerIndex]
    body.courseData.subscribers.map((student) => {
        student.seen = false
        delete student.JoinDate
        if (activeUsers.find((user) => user.userId == student.id)) student.seen = true
    })

    //Preventing null objects ==>
    const filterdRecipients = body.courseData.subscribers.filter(student => student)
    return new notificationModel({ userId: body.user.id, courseId: body.courseData._id, title: body.title, recipient: filterdRecipients, type: body.type, courseName: body.courseData.title, userName: body.user.userName, description: body.description }).save()
}


const addNormalNotificationMsgTODatabase = async (body: notification,) => {

    //Deleting id of intercation creator from notification list
    const ownerIndex = body.courseData.subscribers.findIndex((s1) => s1.id == body.user.id)
    if (ownerIndex > -1) delete body.courseData.subscribers[ownerIndex]
    body.courseData.subscribers.map((student) => {
        student.seen = false
        delete student.JoinDate

    })
    //Preventing null objects ==>
    const filterdRecipients = body.courseData.subscribers.filter(student => student)
    return new notificationModel({ userId: body.user.id, courseId: body.courseData._id, title: body.title, description:body.description, recipient: filterdRecipients, type: body.type, courseName: body.courseData.title, userName: body.user.userName,notificationImageUrl:body.user.pfpUrl}).save()

}


const fetchNotifications = async (data: onlineUserDTO) => {
  try{
    const unSeennotifications = await notificationModel.find({ recipient: { $elemMatch: { id: data.userId, seen: false } } })
    const oldNotifications = await notificationModel.find({ recipient: { $elemMatch: { id: data.userId, seen: true } } }).sort({time:-1})    
    return {seen:oldNotifications,unseen:unSeennotifications}
  }catch (err) {throw err}
}

const markNotificationAsRead = async (notificationIdList: string[], user: user) => {
    try {
        const result = await notificationModel.updateMany(
            { _id: { $in: notificationIdList }, 'recipient.id': user.id },
            { $set: { 'recipient.$.seen': true } }
        );
        return result;

    } catch (error) {
        throw error
    }
}

export {
    addLiveNotificationMsgTODatabase,
    fetchNotifications,
    addNormalNotificationMsgTODatabase,
    markNotificationAsRead
}