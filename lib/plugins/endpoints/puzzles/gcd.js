/*eslint no-else-return: 0 */

'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/gcd/{num1}/{num2}',
    config: {
      description: 'Get the greatest common denominator of two integers',
      validate: {
        params: {
          num1: Joi.string().required(),
          num2: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var largerNum, smallerNum;
        var remainder = 1;
        var a = Math.abs(request.params.num1 * 1);
        var b = Math.abs(request.params.num2 * 1);
        if(Math.floor(a) !== a || Math.floor(b) !== b){
          return reply().code(400);
        }else{
          largerNum = a > b ? a : b;
          smallerNum = a > b ? b : a;
          while(remainder > 0){
            remainder = largerNum % smallerNum;
            largerNum = smallerNum;
            smallerNum = remainder;
          }
          return reply({value: largerNum});
        }
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.gcd'
};
