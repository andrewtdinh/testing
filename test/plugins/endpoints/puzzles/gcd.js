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

describe('GET /puzzles/gcd/{num1}/{num2}', function(){
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
  it('should return the greatest common denominator of two integers', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/252/105', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(21);
      done();
    });
  });
  it('should throw an error on non-integers', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/@/105', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should return the greatest common denominator of two integers, even if one or both are negative numbers', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/-252/105', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(21);
      done();
    });
  });
  it('should only take two numbers as an argument, otherwise error', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/252/105/1', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('should return 1 if numbers are prime', function(done){
    server.inject({method: 'GET', url: '/puzzles/gcd/37/11', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(1);
      done();
    });
  });
});
