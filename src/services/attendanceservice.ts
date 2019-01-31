import { Attendance, IAttendance,IAttendaceDocument } from '../models/attendance';

export class AttendanceService {

    /** filters attendance  */

    async getAddentants( filters?: IAttendance) : Promise<IAttendance[]> {
      return await Attendance.find(filters).populate('student'); 
    }

    /**
     * Add new attendance to the database
     */

    async addAttendance(data:IAttendaceDocument):Promise<IAttendaceDocument> {
        const attendance = new Attendance(data)
        await attendance.save()

        return attendance;
    }
}

