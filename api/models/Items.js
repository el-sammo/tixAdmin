/**
* Items.js
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
    name: {
      type: 'string',
      required: true
    },
		menuId: {
      type: 'string',
      required: true
		}
  },

  ///
  // Waterline Mutations
  ///

  beforeCreate: function(values, next) {
    handleImages(Images, values, next);
  },

  beforeUpdate: function(values, next) {
    handleImages(Images, values, next);
  },

};

tablize(module.exports);

function handleImages(Images, doc, next) {
  if(doc.id && doc.image) {
    var p = Images.process(doc, 'items', 'id', 'image');
    p.then(next);
    p.catch(next);
  } else {
    next();
  }
}

