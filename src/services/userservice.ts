import { User } from "../models/user";
import * as bcrypt from 'bcrypt';
export class UserService {

    async getUsers() {
        const users = await User.find({});
    
        return users;
    }
    
    async createUser(data) {
        const user =  new User(data)
        await user.save();
        return user
        
    }

    async getUserById(id:string) {
        const user  = await User.findOne({_id: id})
        return user
    }

    async updateUser(id:string, data: any) {
        const user  = await User.update({_id: id},data)
        return user
    }
}