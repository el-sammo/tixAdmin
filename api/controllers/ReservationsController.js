/**
 * ReservationsController
 *
 * @description :: Server-side logic for managing reservations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
};

module.exports = {
  datatables: function(req, res) {
    var options = req.query;

    Reservations.datatables(options).sort({createdAt: 'asc'}).then(function(results) {
      res.send(JSON.stringify(results));
    }).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
    });
  },

	byCustomerId: function(req, res) {
		Reservations.findByCustomerId(req.params.id).sort({updatedAt: 'desc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byCustomerIdCompleted: function(req, res) {
		Reservations.find({customerId: req.params.id}).sort({updatedAt: 'desc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	last24Hours: function(req, res) {
		var today = new Date();
	
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth();
		var thisDate = today.getDate();
	
		var todayMilliseconds = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime();

		Reservations.find({paymentAcceptedAt: { '>=': todayMilliseconds}}).sort({paymentAcceptedAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	allTime: function(req, res) {
		Reservations.find().sort({updatedAt: 'desc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	daily: function(req, res) {
		var today = new Date();
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth();
		var thisDate = today.getDate();

		var thisHour = new Date().getHours();

		if(thisHour < 2) {
			var yesterday = new Date();
			yesterday.setDate(thisDate - 1);
			var todayMilliseconds = new Date(yesterday).getTime();
		} else {
			var todayMilliseconds = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime();
		}

		Reservations.find({paymentInitiatedAt: { '>=': todayMilliseconds}}).sort({updatedAt: 'desc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	weekly: function(req, res) {
		var today = new Date();
	
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth();
		var thisDate = today.getDate();

		var sevDaysMilli = 7 * 24 * 60 * 60 * 1000;
	
		var weekAgoMilliseconds = (new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime()) - sevDaysMilli;

		Reservations.find({paymentInitiatedAt: { '>=': weekAgoMilliseconds}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	monthly: function(req, res) {
		var today = new Date();
	
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth();
		var thisDate = today.getDate();

		var thirtyDaysMilli = 30 * 24 * 60 * 60 * 1000;
	
		var monthAgoMilliseconds = (new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime()) - thirtyDaysMilli;

		Reservations.find({paymentInitiatedAt: { '>=': monthAgoMilliseconds}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	dailyOrphaned: function(req, res) {
		var ts = new Date().getTime();
		var yesterday = ts - (24 * 3600000 * 7);
		var yesterdayDate = new Date(yesterday);

		Reservations.find({updatedAt: { '>=': yesterdayDate}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	weeklyOrphaned: function(req, res) {
		var ts = new Date().getTime();
		var weekAgo = ts - (24 * 3600000 * 7);
		var weekAgoDate = new Date(weekAgo);

		Reservations.find({updatedAt: { '>=': weekAgoDate}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	monthlyOrphaned: function(req, res) {
		var ts = new Date().getTime();
		var monthAgo = ts - (24 * 3600000 * 7);
		var monthAgoDate = new Date(monthAgo);

		Reservations.find({updatedAt: { '>=': monthAgoDate}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
};
