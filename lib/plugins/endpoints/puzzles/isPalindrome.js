'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/isPalindrome/{word}',
    config: {
      description: 'Checks if a word is a palindrome',
      validate: {
        params: {
          word: Joi.string().required().regex(/^[a-z]+$/ig)
        }
      },
      handler: function(request, reply){
        console.log(request.params.word);
        var letArr = request.params.word.toLowerCase().split('');
        var result = request.params.word.toLowerCase().split('').reverse()
        .map(function(l, index){
          return l === letArr[index];
        })
        .reduce(function(p, c){
          return p && c;
        });
        return reply({value: result});
      }
    }
  });
  return next();
};

exports.register.attributes = {
  name: 'puzzles.isPalindrome'
};
