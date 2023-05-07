
export interface user {
    id: String,
    JoinDate: String | null | undefined,
}

export interface socketUser extends user {
    seen: Boolean,
    userName: String,
    userSocketid: String
}

export interface onlineUserDTO {
    userId: String,
    dname: String,
}
