import { socketUser } from "./user.dtoo"

export interface alliance {
    _id: string
    name: String
    description: String
    owner: String
    imgurl: String
    students: Array<socketUser>
    inviteurl: String
}