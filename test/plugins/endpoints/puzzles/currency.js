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

describe('GET /puzzles/currency/{num}', function(){
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
  it('should take an integer and return a currency format value', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/456234', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$456,234.00');
      done();
    });
  });
  it('should take a float and return a currency format value', function(done){
    server.inject({method: 'GET', url: '/puzzles/currency/1456234.789', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal('$1,456,234.79');
      done();
    });
  });
});
