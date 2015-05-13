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

describe('GET /puzzles/isprime/{num}', function(){
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
  it('should return true after evaluating if a number is prime', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/7', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should return false after evaluating a non-prime number', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/33', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return false after evaluating 1', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/1', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should return false after evaluating a negative number', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/-11', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should throw an error for non-numbers', function(done){
    server.inject({method: 'GET', url: '/puzzles/isprime/f', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      // expect(response.result.value).to.equal(false);
      done();
    });
  });
});
