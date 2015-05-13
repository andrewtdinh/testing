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

describe('GET /puzzles/distance/{coords}', function(){
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
  it('return a total distance spent traversing along two provided coord pairs', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/(1,2)(4,6)', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(5);
      done();
    });
  });
  it('return a total distance spent traversing along three provided coord pairs', function(done){
    server.inject({method: 'GET', url: '/puzzles/distance/(1,2)(4,6)(10,-2)', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(15);
      done();
    });
  });
});
