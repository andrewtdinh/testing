'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/math/area/{num1}/{num2}',
    config: {
      description: 'calculate area of rectangle',
      validate: {
        params: {
          num1: Joi.number().required(),
          num2: Joi.number().required()
        }
      },
      handler: function(request, reply){
        return reply({value: (request.params.num1 * request.params.num2)});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'math.area'
};
