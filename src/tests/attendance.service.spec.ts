import * as chai from 'chai';
import { AttendanceService } from '../services/attendanceservice';
import { IAttendance, Attendance } from '../models/attendance';

let service: AttendanceService;

const { expect } = chai;
beforeEach(function(done) {
   service = new AttendanceService()
   done();
});

describe('Attendance service ', () => {

    it(' Get Attendace  ', function(done) {
        service.getAttendance()
                .then(function(res){
                    expect(res).to.be.an('array');
                })
        done()
    })
})