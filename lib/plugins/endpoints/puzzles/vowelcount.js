'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/vowelcount/{word}',
    config: {
      description: 'Return the number of vowels in a word',
      validate: {
        params: {
          word: Joi.string().required().regex(/^[a-z]+$/ig)
        }
      },
      handler: function(request, reply){
        var vowelArr = ['a', 'e', 'i', 'o', 'u'];
        var vowelCount = 0;
        var wordArr = request.params.word.toLowerCase().split('');
        wordArr.forEach(function(ch){
          if(vowelArr.indexOf(ch) !== -1){
            vowelCount += 1;
          }
        });
        return reply({value: vowelCount});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.vowelcount'
};
