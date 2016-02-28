/**
* Entities.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var tablize = require('sd-datatables');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
		},
    mascot: {
      type: 'string',
      required: true
		},
    color1: {
      type: 'string',
      required: true
		},
    color2: {
      type: 'string',
      required: true
		},
    leagueCode: {
      type: 'string',
      required: true
		}
  }
  
};

tablize(module.exports);

