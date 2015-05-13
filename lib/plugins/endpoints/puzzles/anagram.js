'use strict';

var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/puzzles/anagram/{word1}/{word2}',
    config: {
      description: 'Checks if a word is an isogram',
      validate: {
        params: {
          word1: Joi.string().required().regex(/^[a-z]+$/ig),
          word2: Joi.string().required().regex(/^[a-z]+$/ig)
        }
      },
      handler: function(request, reply){
        var letArr2 = request.params.word2.toLowerCase().split('').sort();
        var result = request.params.word1.toLowerCase().split('').sort()
        .map(function(l, index){
          return l === letArr2[index];
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
  name: 'puzzles.anagram'
};
