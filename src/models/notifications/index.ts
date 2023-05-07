import mongoose, { Schema } from "mongoose";
import {notificationModal} from '../../helpers/interfaces/notifications.dto'

export interface notificationModel extends notificationModal, mongoose.Document { }

interface recipientUser{
    id:string,
    seem:boolean
}

const notificationSchema: Schema = new Schema({
    userName:{type:String,required:false},
    allianceName:{type:String},
    userId: { type: String, required: true },
    allianceId: { type: String, required: true },
    time: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: false },
    recipient:{type:Array<recipientUser>,required:false},
    type:{type:String,required:true}
})

export default mongoose.model<notificationModel>('notifications', notificationSchema)