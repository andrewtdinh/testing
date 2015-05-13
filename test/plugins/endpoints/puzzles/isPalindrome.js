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

describe('GET /puzzles/isPalindrome/{word}', function(){
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
  it('should check for palindromeness & return true to "zerorez"', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPalindrome/zerorez', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(true);
      done();
    });
  });
  it('should check for palindromeness & return false to "flimsy"', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPalindrome/flimsy', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.value).to.equal(false);
      done();
    });
  });
  it('should throw error for non-letter characters', function(done){
    server.inject({method: 'GET', url: '/puzzles/isPalindrome/fl!msy', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
});
