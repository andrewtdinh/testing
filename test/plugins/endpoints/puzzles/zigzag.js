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

describe('GET /puzzles/zigzag/{numString}', function(){
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
  it('should take a string of numbers and return an array of zigzag arranged values', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/6,2,5,4,3,1,7', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([7, 1, 6, 2, 5, 3, 4]);
      done();
    });
  });
  it('should take a string of numbers and return an array of zigzag arranged values', function(done){
    server.inject({method: 'GET', url: '/puzzles/zigzag/6,2,-1,5,4,3,1,7', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.deep.equal([7, -1, 6, 1, 5, 2, 4, 3]);
      done();
    });
  });
});
