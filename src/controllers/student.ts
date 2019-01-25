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
        User.find({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName}, function(err, user){
            
            console.log(user)
            if(user.length > 0 ) {
                next(new HttpException(400,"User with that name and email already exist"));
            } else {

                new UserService()
                    .createUser(req.body)
                    .then(function(user){
                        res.json(user)
                    })
                    .catch(err => next(err))
            
            }
            
            if (err) {
                new HttpException(400, err);
            }
            
        })
        
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

    public getStudent(req: Request,res: Response, next: NextFunction) {
           new UserService()
             .getUserById(req.params.id)
             .then(user => res.json(user))
             .catch(err => next(err));
    }

}

export default new StudentController();

