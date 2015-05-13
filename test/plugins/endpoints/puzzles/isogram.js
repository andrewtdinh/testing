/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Server = require('../../../../lib/server');
var Mongoose = require('mongoose');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;
var server;

describe('GET /puzzles/isogram/"dog"', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });
  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });
  it('should check for isogram & reply true to "dog"', function(done){
    server.inject({method: 'GET', url: '/puzzles/isogram/dog', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should check for isogram & reply false to "dribble"', function(done){
    server.inject({method: 'GET', url: '/puzzles/isogram/dribble', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should check for isogram & reply false to "dribBle"', function(done){
    server.inject({method: 'GET', url: '/puzzles/isogram/dribBle', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should check for isogram & reply with an error if checking numbers', function(done){
    server.inject({method: 'GET', url: '/puzzles/isogram/1234', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      // expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should check for isogram & reply with an error if special characters are passed in', function(done){
    server.inject({method: 'GET', url: '/puzzles/isogram/!#&!', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      // expect(response.result.value).to.equal(false);
      done();
    });
  });
});
