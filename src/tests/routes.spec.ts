import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { routes } from "../routes"
import 'mocha';
import app from  "../server";
import * as supertest from "superagent";

chai.use(chaiHttp)
const { expect } = chai;

describe('Test API rote availability', () => {

    it('Test the basic root', function(done) {
          chai.request(app)
          .get('/')
          .end(function(err, res){
            expect(res).to.have.status(200)
            done();
          });
          
    })

})


describe('API Route testing ', () => {

  it('Test the basic root', function(done) {
        chai.request(app)
        .get('/')
        .end(function(err, res){
          expect(res).to.have.status(200)
          done();
        });
        
  })

})

describe('Students api', () => {

  it('Get Students ', function(done) {
        chai.request(app)
        .get('/students')
        .end(function(err, res){
          expect(res).to.have.status(200)
          done();
        });
        
  })

})


describe('Attendance Api ', () => {

  it('Get Attendance ', function(done) {
        chai.request(app)
        .get('/attendance')
        .end(function(err, res){
          expect(res).to.have.status(200)
          done();
        });
        
  })

})



