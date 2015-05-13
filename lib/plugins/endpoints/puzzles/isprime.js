'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isprime/{num}',
    config: {
      description: 'Get the greatest common denominator of two integers',
      validate: {
        params: {
          num: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var isPrime = true;
        var num = request.params.num * 1;
        if(Math.floor(num) !== num){
          return reply().code(400);
        }else if(num <= 1){
          isPrime = false;
        }else if(num <= 3){
          isPrime = true;
        }else if(num % 2 === 0){
          isPrime = false;
        }else{
          for(var i = 3; i <= Math.sqrt(num); i += 2){
            if(num % i === 0){
              isPrime = false;
            }
          }
        }
        return reply({value: isPrime});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.isprime'
};
