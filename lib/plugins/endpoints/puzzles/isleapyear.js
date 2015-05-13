/*eslint no-else-return: 0 */

'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isleapyear/{year}',
    config: {
      description: 'Get the greatest common denominator of two integers',
      validate: {
        params: {
          year: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var year = Math.abs(request.params.year);
        if(isNaN(year)){
          return reply().code(400);
        }else{
          var result;
          if(((year % 4 === 0) && (year % 100 !== 0)) || (((year % 4 === 0) && (year % 100 === 0)) && (year % 400 === 0))){
            result = true;
          }else{
            result = false;
          }
          return reply({value: result});
        }
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.isleapyear'
};
