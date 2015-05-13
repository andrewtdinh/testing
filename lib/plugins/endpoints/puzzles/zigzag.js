'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/zigzag/{numString}',
    config: {
      description: 'Arrange a string of numbers in an alternating high-low value pattern',
      validate: {
        params: {
          numString: Joi.string().required()
        }
      },
      handler: function(request, reply){
        var numArr = request.params.numString.split(',').map(function(num){
          return num * 1;
        }).sort(function(a, b){
          return b - a;
        });
        var arrLength = numArr.length;
        var j;
        var result = [];
        for(var i = 0; i < Math.ceil(arrLength / 2); i++){
          j = arrLength - 1 - i;
          if(i === j){
            result.push(numArr[i]);
          }else{
            result.push(numArr[i]);
            result.push(numArr[j]);
          }
        }
        console.log('result: ', result);
        return reply({value: result});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.zigzag'
};
