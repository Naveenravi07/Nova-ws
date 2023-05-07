import { alliance } from "./alliance.dto";
import { socketUser } from "./user.dtoo";

export interface notificationModal {
  userId: string;
  userName: string;
  allianceName: string;
  title: string;
  description: string;
  time: Date;
  allianceId: string;
  recipient: socketUser[];
  type: string;
}

export interface notification extends Omit<notificationModal, 'userName' | 'allianceName' | 'allianceId' | 'userId'> {
  allianceData: alliance;
  user: socketUser;
  title : string,
  description : string
}