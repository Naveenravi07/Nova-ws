
export interface user {
    id: String,
    JoinDate: String | null | undefined,
    pfpUrl:String
}

export interface socketUser extends user {
    seen: Boolean,
    userName: String,
    userSocketid: String,
}

export interface onlineUserDTO {
    userId: String,
    dname: String,
}
