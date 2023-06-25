import { course } from "./course.dto";
import { socketUser } from "./user.dtoo";

export interface notificationModal {
  userId: string;
  userName: string;
  courseName: string;
  title: string;
  description: string;
  time: Date;
  courseId: string;
  recipient: socketUser[];
  type: string;
  notificationImageUrl:String
}

export interface notification extends Omit<notificationModal, 'userName' | 'courseName' | 'courseId' | 'userId'> {
  courseData: course;
  user: socketUser;
  title : string,
  description : string
}