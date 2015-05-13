'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isogram/{word}',
    config: {
      description: 'Checks if a word is an isogram',
      validate: {
        params: {
          word: Joi.string().required().regex(/[a-z]/ig)
        }
      },
      handler: function(request, reply){
        var word = request.params.word.toLowerCase();
        var result = true;
        word = word.split('');
        word.forEach(function(ch, index, array){
          if(array.lastIndexOf(ch) !== array.indexOf(ch)){
            result = false;
          }
        });
        return reply({value: result});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.isogram'
};
