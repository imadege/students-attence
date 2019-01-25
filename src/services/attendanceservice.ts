import { Attendance, IAttendance } from '../models/attendance';


export class AttendanceService {

    /** filters attendance  */

    async getAttendance( filters?: IAttendance) : Promise<IAttendance[]> {
      return await Attendance.find(filters).populate('student'); 
    }
    /** Add new attendance to the database */

    async addAttendance(data:IAttendance):Promise<IAttendance> {
        const attendance = new Attendance(data)
        await attendance.save()

        return attendance;
    }
}