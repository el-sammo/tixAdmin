/**
 * ShiftsController
 *
 * @description :: Server-side logic for managing shifts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  datatables: function(req, res) {
    var options = req.query;

    Shifts.datatables(options).sort({date: 'asc'}).then(function(results) {
      res.send(JSON.stringify(results));
    }).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
    });
  },

	byDriverId: function(req, res) {
		Shifts.find({driverId: req.params.id}).sort({date: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	}
	
};

