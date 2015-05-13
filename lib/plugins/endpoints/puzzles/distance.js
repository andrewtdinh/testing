/* eslint no-unused-expressions: 0 */

'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/distance/{coords}',
    config: {
      description: 'return total distance between x/y coords',
      validate: {
        params: {
          coords: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var coordArr = request.params.coords.split('(').join('').split(')').slice(0, -1).join(',').split(',');
        var xCoords = [];
        var yCoords = [];
        coordArr.forEach(function(coord, index){
          (index % 2 === 0) ? xCoords.push(coord) : yCoords.push(coord);
        });
        var distance = 0;
        var yCoord;
        xCoords.forEach(function(coord, index){
          if(index < (xCoords.length - 1)){
            yCoord = yCoords[index];
            distance += Math.sqrt(Math.pow((coord - xCoords[index + 1]), 2) + Math.pow((yCoord - yCoords[index + 1]), 2));
          }
        });
        return reply({value: distance});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.distance'
};
