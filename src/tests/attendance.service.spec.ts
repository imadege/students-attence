import * as chai from 'chai';
import { UserService } from "../services/userservice";
import { User, IUserDocument, IUserModel } from '../models/user';
import *  as _ from "lodash";
import { AttendanceService } from '../services/attendanceservice';
import { IAttendance, Attendance } from '../models/attendance';
import { UserData, AttendaceData } from '../utils/fixtures';
import student from 'controllers/student';
import HttpException from '../exceptions';

let service: UserService;

let attendanceService: AttendanceService;

const { expect } = chai;

describe('Attendance  Service', () => {
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
                    .getAddentants()
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
            await attendanceService
                    .addAttendance({"student":user._id, "date":"2019-01-30", "status":"absent"})
                    .then(function(response){
                        expect(response).to.have.property('student').equal(user._id)
                    }).catch(function(err){
                        console.log(err)
                        new HttpException(400, err)
                    })
        })

        afterEach(async function () {
            Attendance.remove({"student":user._id}).exec()
            User.findOneAndDelete({email: UserData.email}).exec();
        })
    })

})
