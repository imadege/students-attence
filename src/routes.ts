import * as express from 'express';
import  student  from "./controllers/student";
import attendance from "./controllers/attendance";

export  const routes = express.Router();

routes.get('/', (req, res) => res.send('Students Attendance API'));
//routes.get('/students', (req, res) => res.send('Students  API'));
routes.get('/students', (req, res, next) => student.getStudents(req, res, next));
routes.post('/students', (req, res, next) => student.addStudent(req,res,next));

routes.get('/attendances', (req, res, next) => attendance.getAttendants(req,res,next));
routes.post('/attendances', (req, res, next)=> attendance.addAttendance(req, res, next));

routes.get('/students/:id',(req,res,next) =>student.getStudent(req, res, next));
routes.get('/students/:id/attendances', (req, res, next)=> attendance.attendancePerStudent(req, res, next));
routes.put('/students/:id',(req,res,next) =>student.updateStudent(req, res, next));
routes.delete('/students/:id',(req,res,next) =>student.updateStudent(req, res, next));

export default routes;
