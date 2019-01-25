import { Router, Request, Response, NextFunction} from "express"; 
import { User } from '../models/user';
import { UserService } from '../services/userservice';
import * as _ from 'lodash'; 
import HttpException from '../exceptions';

class StudentController { 

    public router: Router;
    constructor(){
    }

    /**
     * Get students list 
     */
    public getStudents = (req: Request, res: Response, next?: NextFunction) => {
           new UserService()
                    .getUsers()
                    .then(users => res.json(users))
                    .catch(err => next(new HttpException(400,err)))
    }
    
    /**
     * Add a new student 
     * @param req 
     * @param res 
     * @param next 
     */
    public addStudent(req: Request, res: Response, next?: NextFunction) {
        new UserService()
            .createUser(req.body)
            .then(function(user){
                res.json(user)
            })
            .catch(err => next(err))
    }


    /** 
     * Update students details 
     */

    public updateStudent(req:   Request,res: Response, next: NextFunction) {
        new UserService()
            .updateUser(req.params.id,req.body)
            .then(user => res.json(user))
            .catch(err => next(err))

    }


}

export default new StudentController();

