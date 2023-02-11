import mongoose, { Schema } from "mongoose";
import {notificationModal} from '../../helpers/interfaces/notifications.dto'

export interface notificationModel extends notificationModal, mongoose.Document { }

const notificationSchema: Schema = new Schema({
    userId: { type: String, required: true },
    allianceId: { type: String, required: true },
    time: { type: Date, default: Date.now },
    title: { type: String, required: true },
    description: { type: String, required: false },
    recipient:{type:Array,required:false},
    type:{type:String,required:true}
})

export default mongoose.model<notificationModel>('notifications', notificationSchema)