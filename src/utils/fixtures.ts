import { IUserDocument } from '../models/user';
import { IAttendance } from '../models/attendance';

export const UserData: IUserDocument = {"email":"imadege1990@gmail.com",
                                    "firstName":"Ian",
                                    "lastName":"Madege",
                                    "password":"1234"
                           }
export const UserUpdateData: IUserDocument = {"firstName":"John", "lastName":"Doe"}

export const AttendaceData  = { "date":"2019-30-01", "status":"absent" }
