import * as chai from 'chai';
import { UserService } from "../services/userservice";
import {User, IUserModel } from '../models/user';
import *  as _ from "lodash";
import { UserData, UserUpdateData } from '../utils/fixtures';

let service: UserService;
const { expect } = chai;

describe('Students service', () => {

    describe('Get', () => {
        beforeEach(async() => {
            service = new UserService()
            await User.remove({}).exec();
           await service.createUser(UserData)
                    .then((users)=>{})
                    .catch((error)=>{})
        })

        it('Students', async() => {
            await service.getUsers()
                    .then(function(res){
                        expect(res.length).to.be.above(0)
                    })
        })

        describe('Filter students', ()=> {
            let sampleUser: IUserModel;
            beforeEach(async ()=> {
                await User.findOne({'email':UserData.email},function(err, user){
                    if (user) sampleUser=user;
                })
            })

            it('By ID', async()=>{
                await service.getUserById(sampleUser._id)
                             .then(function(res){
                                expect(res).to.have.property('email').equal(UserData.email);
                             }).catch((err)=> err)
            })
        })
        afterEach(async function () {
            await User.remove({email: UserData.email}).exec();
        })
    })

    describe('Add', ()=>{
        beforeEach(async() => {
            await User.deleteMany({});
        })

        it('Student', async() => {
            await service.createUser(UserData)
                .then(function(res){
                    expect(res).to.have.property('email').equal(UserData.email);
                })
        })

        afterEach(async  () => {
             await User.remove({email: UserData.email}).exec();
        })
    })

    describe('Update', () => {
        let sampleUser:IUserModel;
        beforeEach(async() => {
            service = new UserService()
           await service.createUser(UserData)
                    .then((user)=>{
                        sampleUser = user
                    })
                    .catch((error)=>{})
        })

        it('Student', async()=>{
            await service.updateUser(sampleUser._id, UserUpdateData)
                          .then(function(user){
                              expect(user).to.have.property('firstName').equal(UserUpdateData.firstName)
                          })
        })

        afterEach(async function () {
            User.findOneAndDelete({email: UserData.email}).exec();
        })
    })

})
