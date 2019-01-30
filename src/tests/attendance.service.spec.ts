import * as chai from 'chai';
import { UserService } from "../services/userservice";
import { User, IUserDocument, IUserModel } from '../models/user';
import *  as _ from "lodash";
import { AttendanceService } from '../services/attendanceservice';
import { IAttendance, Attendance } from '../models/attendance';
import { UserData, AttendaceData } from '../utils/fixtures';
import student from 'controllers/student';

let service: UserService;

let attendanceService: AttendanceService;

const { expect } = chai;

describe('Attendace  Service', () => {
    let user;
    let attendace: IAttendance;
    describe('Get', () => {
        beforeEach(async() => {
            service = new UserService()
            attendanceService = new AttendanceService()
            await service.createUser(UserData)
                    .then((users)=>{})
                    .catch((error)=>{})
            user = User.findOne({'email':UserData.email})
        })

        it ('Attendaces', async()=>{
            await attendanceService
                    .getAttendance()
                    .then(function(attendacies){
                        expect(attendacies).to.be.an('array')
                    })
        })

        afterEach(async function () {
            User.findOneAndDelete({email: UserData.email}).exec();
        })
    })

    describe('Add', () => {
        beforeEach(async() => {
            await service.createUser(UserData)
                    .then((users)=>{
                        user = users
                    })
                    .catch((error)=>{})
        })

        it ('Attendaces', async()=>{
            console.log(user)
           await attendanceService
                    .addAttendance({"student":user._id, "date":"2019-01-30", "status":"ABSENT"})
                    .then(function(attendacies){
                        expect(attendacies).to.have.property('student').equal(user._id)
                    })
        })

        afterEach(async function () {
            Attendance.remove({"student":user._id}).exec()
            User.findOneAndDelete({email: UserData.email}).exec();
        })
    })

})
