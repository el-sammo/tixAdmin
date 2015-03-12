/**
 * CustomersController
 *
 * @description :: Server-side logic for managing customers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  datatables: function(req, res) {
    var options = req.query;

    Customers.datatables(options).sort({fName: 'asc'}).then(function(results) {
      res.send(JSON.stringify(results));
    }).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
    });
  },

	byAreaId: function(req, res) {
		Customers.findByAreaId(req.params.id).sort({fName: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byFName: function(req, res) {
		Customers.find({fName: {contains: req.params.id}}).sort({fName: 'asc', lName: 'asc', 'addresses.primary.streetNumber': 'asc', 'addresses.primary.streetName': 'asc'}).limit(20).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byLName: function(req, res) {
		Customers.find({lName: {contains: req.params.id}}).sort({fName: 'asc', lName: 'asc', 'addresses.primary.streetNumber': 'asc', 'addresses.primary.streetName': 'asc'}).limit(20).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byPhone: function(req, res) {
		Customers.find({phone: {contains: req.params.id}}).sort({fName: 'asc', lName: 'asc', 'addresses.primary.streetNumber': 'asc', 'addresses.primary.streetName': 'asc'}).limit(20).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	}
	
};

