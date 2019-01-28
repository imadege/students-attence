import * as chai from 'chai';
import { UserService } from "../services/userservice";

let service: UserService;

const { expect } = chai;
beforeEach(function(done) {
   service = new UserService()
   done();
});

describe('Students service', () => {

    it(' Get Student  ', function(done) {
        service.getUsers()
                .then(function(res){
                    expect(res).to.be.an('array');
                })
        done()
    })

})
