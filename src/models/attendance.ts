import { Document, Schema, Model, model} from "mongoose";
import { mongoose } from '../config/database';


export interface IAttendaceDocument {
    student: Schema.Types.ObjectId;
    date: string;
    remarks?: string;
    status?: string;
}
export interface IAttendance extends IAttendaceDocument, Document {

}


/**
 * Attendance Model
 */

const AttendanceSchema : Schema = new Schema ({
    student: { type: Schema.Types.ObjectId, ref:'User', required: true},
    date: { type: Date, required: true},
    status: {type: String, enum: ['present', 'absent'], default : 'absent'},
    remarks: { type: String}

})


/**
 * Presave methods executed to hash password
 */
AttendanceSchema.pre<IAttendance>('save', function(next) {
    const attendance = this
    this.status = this.status.toLowerCase()
    next()
})
const Attendance: Model<IAttendance> = mongoose.model<IAttendance>("Attendance", AttendanceSchema)

export { Attendance }

