
interface recipientDto {
    id: String,
    lastSeen: Date,
    seen: Boolean,
}

interface studentDto extends recipientDto {
    id: String,
    JoinDate: String|null|undefined,
}

interface userDto{
    userId:String,
    username:String,
    userSocketid:String
}

interface AllianceDataDTO {
    name: String,
    _id: String,
    students: Array<studentDto>
}

interface notificationDto {
    user: userDto,
    title: String,
    description: String,
    time: Date,
    allianceData: AllianceDataDTO,
    recipient:studentDto[],
    type:String
}


export { notificationDto,AllianceDataDTO,studentDto }
