/**
 * ApplicantsController
 *
 * @description :: Server-side logic for managing applicants
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	allTime: function(req, res) {
		Applicants.find({'areaId': req.params.id}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	daily: function(req, res) {
		var ts = new Date().getTime();
		var yesterday = ts - (24 * 3600000);
		var yesterdayDate = new Date(yesterday);

		Applicants.find({'areaId': req.params.id, 'createdAt': { '>=': yesterdayDate}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	weekly: function(req, res) {
		var ts = new Date().getTime();
		var yesterday = ts - (24 * 3600000 * 7);
		var yesterdayDate = new Date(yesterday);

		Applicants.find({'areaId': req.params.id, 'createdAt': { '>=': yesterdayDate}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	monthly: function(req, res) {
		var ts = new Date().getTime();
		var yesterday = ts - (24 * 3600000 * 28);
		var yesterdayDate = new Date(yesterday);

		Applicants.find({'areaId': req.params.id, 'createdAt': { '>=': yesterdayDate}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
};

