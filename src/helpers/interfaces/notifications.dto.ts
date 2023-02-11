import { alliance } from "./alliance.dto"
import { socketUser } from "./user.dtoo"

export interface notificationModal {
    userId: String
    title: String
    description: String
    time: Date
    allianceId: String
    recipient: socketUser[]
    type: String
}

export interface notification extends notificationModal {
    allianceData: alliance
    user: socketUser
}