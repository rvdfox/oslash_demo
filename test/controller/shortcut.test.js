const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server  = require('../../app');
const user = require('../../models').user;
const userAuth = require('../../models').userAuth;
const shortcut = require('../../models').shortcut;

const { expect } = chai;

let registerDetails = {
  "email":"test@abc.com",
  "firstname":"Jhon",
  "lastname":"Wick",
  "password":"abc123"
}

let loginDetails = {
  "email":"test@abc.com",
  "password":"abc123"
}

chai.use(chaiHttp);

describe('User', ()=>{
  it('can register, login, create a shortcut and list shortcuts', () => {
    chai.request(server).post('/user')
    .send(registerDetails)
    .end((err,res)=>{
      res.should.have.status(201);
      expect(res.body.success).to.be.true;

      chai.request(server).post('/user/login')
      .send(loginDetails)
      .end((err,res)=>{
        res.should.have.status(200);
        expect(res.body.success).to.be.true;
        res.body.data.should.have.property('authToken');

        let token = res.body.data.authToken;
        console.log('Token ',token);

        chai.request(server).post('/shortcut')
        .send({
          authToken: token,
          shortlink: "books",
          description: "Book collection",
          url: "http://bookfinder.com",
          tags: ["book","fiction"]
        })
        .end((err,res)=>{
          res.should.have.status(201);
          expect(res.body.success).to.be.true;
          res.body.data.should.have.property('shortcut');
          res.body.data.should.have.property('fullurl');

          chai.request(server).get('/shortcut')
          .query({
            authToken: token,
            sort: "yes",
            order: "ascending",
            sort_by: "shortlink"
          })
          .end((err,res)=>{
            res.should.have.status(200);
            expect(res.body.success).to.be.true;
            expect(res.body.data).to.be.a('array');
            expect(res.body.data[0]).to.be.a('object');
            res.body.data[0].should.have.property('shortlink');
            res.body.data[0].should.have.property('fullurl');
            res.body.data[0].should.have.property('description');
            res.body.data[0].should.have.property('tags');
          })
        })
      })
    })
  })
})
