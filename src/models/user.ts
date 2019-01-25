import { Document, Schema, Model, model} from "mongoose";
import { mongoose } from '../config/database';
import * as bcrypt from "bcrypt";

const SALT_WORK_FACTOR = 10;
/**
 * Model Interface for user
 */
interface IUserModel extends Document {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string; 
    createdAt?: Date;
    attendanceStatus?: string;
    remarksAttendace?: string; 

    comparePassword(candidatePassword: string): Promise<boolean>;

}

/**
 * Userschema and it properties
 */

const UserSchema: Schema = new Schema({
    email: { type: String, required: true},
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    level: String,
    createdAt: { type: Date, default: Date.now},
    password: { type:String, required: true, select: false }
})

/**
 * Presave methods executed to hash password
 */
UserSchema.pre<IUserModel>('save', function(next) {
    const user = this
    if(!user.isModified('password')) return next();

    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
    
   
})

UserSchema.pre<IUserModel>("update", function (next) {
    const user = this
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
});
/**
 * Method used to validate password 
 */

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            if (err) return reject(err);
            return resolve(success);
        });
    });
};

const User: Model<IUserModel> = mongoose.model<IUserModel>("User", UserSchema)

export { User }
