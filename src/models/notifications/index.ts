import mongoose, { Schema } from "mongoose";
import { notificationDto } from "../../helpers/interfaces/notification.dto";
import { studentDto } from "../../helpers/interfaces/notification.dto";

export interface notificationModel extends notificationDto, mongoose.Document { }

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