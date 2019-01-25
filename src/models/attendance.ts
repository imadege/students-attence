import { Document, Schema, Model, model} from "mongoose";
import { mongoose } from '../config/database';


export interface IAttendance extends Document {
    student: Schema.Types.ObjectId;
    date: Date;
    remarks?: string;

}


/**
 * Attendance Model
 */

const AttendanceSchema : Schema = new Schema ({
    student: { type: Schema.Types.ObjectId, ref:'User', required: true},
    date: { type: Date, required: true},
    remarks: { type: String}
})



const Attendance: Model<IAttendance> = mongoose.model<IAttendance>("Attendance", AttendanceSchema)

export { Attendance }

