'use strict';

// var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/currency/{numString}',
    config: {
      description: 'return a currency formatted string from a number string',
      // validate: {
      //   params: {
      //     numString: Joi.string().required()
      //   }
      // },
      handler: function(request, reply){
        var tempNum = (request.params.numString * 1).toFixed(2);
        tempNum = tempNum.toString().split('.');
        var numArr = tempNum.slice(0, 1);
        tempNum = tempNum.slice(1);
        numArr = numArr[0].toString().split('');
        var result = [];
        var modResult = numArr.length % 3;
        if(modResult){
          result.push(numArr.slice(0, modResult));
          numArr = numArr.slice(modResult);
        }
        for(var i = 0; i < numArr.length; i += 3){
          var j = i + 3;
          if(j < numArr.length){
            result.push(numArr.slice(i, j).join(''));
          }else{
            result.push(numArr.slice(i).join(''));
          }
        }
        result.join(',');
        result = '$' + result + '.' + tempNum;
        return reply({value: result});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.currency'
};
