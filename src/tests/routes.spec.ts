import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { routes } from "../routes"
import 'mocha';
import app from  "../server";
import { UserData, AttendaceData } from '../utils/fixtures';
import { UserService } from '../services/userservice';
import { AttendanceService } from '../services/attendanceservice';
import { IUserDocument, User, IUserModel } from '../models/user';
import { IAttendaceDocument, Attendance } from '../models/attendance';


chai.use(chaiHttp)
const { expect } = chai;

describe('Test API rote availability', () => {
    let user: IUserDocument;
    let attendace: IAttendaceDocument;
    let userService: UserService;
    let attendaceService: AttendanceService;

    beforeEach(async()=> {
      await User.remove({}).exec();
      userService = new UserService();
      attendaceService = new AttendanceService()
    })

    it('Test the basic root', function(done) {
          chai.request(app)
          .get('/')
          .end(function(err, res){
            expect(res).to.have.status(200)
            done();
          });
    })

    describe('Get Student Route', ()=> {
      beforeEach( async() => {
         await userService.createUser(UserData)
                  .then(function(users){

                  }).catch((err)=>err)
      })

      it('Students route return 200 ', function(done) {
        chai.request(app)
        .get('/students')
        .end(function(err, res){
          expect(res).to.have.status(200)
          done();
        });
      })

      it('Route selected some stundents ', async() => {
        const users = await User.find()
        chai.request(app)
        .get('/students')
        .end(function(err, res){
          expect(res.body[0]).to.have.deep.property('email',UserData.email)
        });
      })

  })

  describe('Add Student route', () => {
    beforeEach( async ()=>{
      await User.remove({}).exec();
    })

    it('Students route return 200 ', function(done) {
      chai.request(app)
      .post('/students')
      .send(UserData)
      .end(function(err, res){
        expect(res).to.have.status(200)
        done();
      });
    })

    it('Student added ', async() => {
      await User.remove({}).exec()
      chai.request(app)
      .post('/students')
      .send(UserData)
      .end(function(err, res){
        expect(res.body).to.have.deep.property('email',UserData.email);
      });
    })

    afterEach(async () => {
      await User.remove({}).exec();
    })
  })

  describe('Attendance Route', () => {
    let newUser: IUserModel;
    beforeEach( async()=>{
      await userService.createUser(UserData)
                  .then(function(user){
                    newUser = user
                  })
                  .catch((err)=>err)
    })
    describe('GET', ()=>{
      beforeEach(async() => {
        await attendaceService.addAttendance({
                  "student": newUser._id,
                  "date":"2019-01-30",
                  "status": "PRESENT",
              })
      })

      it('Attedance route return 200 ', function(done) {
        chai.request(app)
        .get('/attendances')
        .end(function(err, res){
          expect(res).to.have.status(200)
          done();
        });
      })

      it('Attedance Has Data ', async()=>{
        await Attendance.remove({}).exec()
        chai.request(app)
        .post('/attendances')
        .send({
          "student": newUser._id,
          "date":"2019-01-30",
          "status": "PRESENT",
        })
        .end(function(err, res){
          expect(res.body).to.have.property('status')
        });
      })

      afterEach(async() => {
        await Attendance.remove({}).exec()
      })
    })

  })


})