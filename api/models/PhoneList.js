/**
* PhoneList.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var tablize = require('sd-datatables');

module.exports = {
  ///
  // Attributes
  ///

  attributes: {
		areaId: {
      type: 'string',
      required: true
		},
		active: {
      type: 'boolean',
      required: true
		}
  }

};

tablize(module.exports);

