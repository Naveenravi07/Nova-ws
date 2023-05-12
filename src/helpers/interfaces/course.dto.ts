import { socketUser } from "./user.dtoo"

export interface course {
    _id: string
    title: String
    description: String
    owner: String
    imgurl: String
    subscribers: Array<socketUser>
    inviteurl: String
}