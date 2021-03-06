import { Router, Request, Response, NextFunction} from "express"; 
import { Attendance } from '../models/attendance';
import { AttendanceService } from '../services/attendanceservice';
import HttpException from '../exceptions';

class AttendanceController { 

    public router: Router;

    constructor(){
    }

    /**
     * get all attendancts 
     *  You can also pass an object to filter 
     */
    public getAttendants = (req: Request, res: Response, next?: NextFunction) => {
          new AttendanceService()
                        .getAddentants(req.body)
                        .then(attendance => res.json(attendance))
                        .catch(err => next(new HttpException(404, err)))
    }

    /**
     * Add a new attendacnce for a student
     * @param req
     * @param res
     * @param next
     */
    public addAttendance(req: Request, res: Response, next?: NextFunction) {
        Attendance.find({student: req.body.student, date: req.body.date}, function(err, attendance){
            if(attendance.length == 0 ){
                new AttendanceService()
                .addAttendance(req.body)
                .then(attendace => res.json(attendace))
                .catch(err => next(new HttpException(400, err)))
           }else{
                 next(new HttpException(400, "Attendace for that student on this day has already been captured"))
           }
            if (err) {
               new HttpException(400, err);
            }
        });

    }

    public attendancePerStudent(req: Request, res: Response, next?: NextFunction) {
        const studentId = req.params.id;
        Attendance.find({student: studentId}, function(err, attendancies){
            if (err)  next(new HttpException(400, "Attendaces for that student do not exist"))

            res.json(attendancies)
        })
    }
}

export default new AttendanceController();
