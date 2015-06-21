/**
 * OrdersController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  datatables: function(req, res) {
    var options = req.query;

    Orders.datatables(options).sort({createdAt: 'asc'}).then(function(results) {
      res.send(JSON.stringify(results));
    }).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
    });
  },

	byCustomerId: function(req, res) {
		Orders.findByCustomerId(req.params.id).sort({updatedAt: 'desc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byCustomerIdCompleted: function(req, res) {
		Orders.find({customerId: req.params.id, orderStatus: 9}).sort({updatedAt: 'desc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	byAreaId: function(req, res) {
		Orders.findByAreaId(req.params.id).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},

	byDriverIdToday: function(req, res) {
		var today = new Date();
	
		var thisYear = today.getFullYear();
		var thisMonth = today.getMonth();
		var thisDate = today.getDate();
	
		var todayMilliseconds = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime();

		Orders.find({driverId: req.params.id, paymentAcceptedAt: { '>=': todayMilliseconds}}).sort({updatedAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},

	byDriverIdDate: function(req, res) {
		var rtParamPcs = req.params.id.split('-date-');
		var driverId = rtParamPcs[0];
		var shiftDate = rtParamPcs[1];

		var thisYear = parseInt(shiftDate.substr(0,4));
		var thisMonth = parseInt(shiftDate.substr(4,2)) - 1;
		var thisDate = parseInt(shiftDate.substr(6,2));

		var thisDayMilliseconds = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime();
		var nextDayMilliseconds = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime() + 86400000;

		Orders.find({driverId: driverId, $and: [ {paymentAcceptedAt: { '>=': thisDayMilliseconds}}, {paymentAcceptedAt: { '<': nextDayMilliseconds}} ] }).sort({updatedAt: 'asc'}).then(function(results) {
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

		Orders.find({areaId: req.params.id, paymentAcceptedAt: { '>=': todayMilliseconds}}).sort({paymentAcceptedAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
	allTime: function(req, res) {
		Orders.find({areaId: req.params.id, orderStatus: { '>': 1}}).sort({updatedAt: 'desc'}).then(function(results) {
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
	
		var todayMilliseconds = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime();

		Orders.find({areaId: req.params.id, paymentInitiatedAt: { '>=': todayMilliseconds}, orderStatus: { '>': 1}}).sort({updatedAt: 'desc'}).then(function(results) {
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

		Orders.find({areaId: req.params.id, paymentInitiatedAt: { '>=': weekAgoMilliseconds}, orderStatus: { '>': 1}}).sort({createdAt: 'asc'}).then(function(results) {
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

		Orders.find({areaId: req.params.id, paymentInitiatedAt: { '>=': monthAgoMilliseconds}, orderStatus: { '>': 1}}).sort({createdAt: 'asc'}).then(function(results) {
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

		Orders.find({areaId: req.params.id, updatedAt: { '>=': yesterdayDate}, orderStatus: { '<': 5}}).sort({createdAt: 'asc'}).then(function(results) {
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

		Orders.find({areaId: req.params.id, updatedAt: { '>=': weekAgoDate}, orderStatus: { '<': 5}}).sort({createdAt: 'asc'}).then(function(results) {
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

		Orders.find({areaId: req.params.id, updatedAt: { '>=': monthAgoDate}, orderStatus: { '<': 5}}).sort({createdAt: 'asc'}).then(function(results) {
			res.send(JSON.stringify(results));
		}).catch(function(err) {
      res.json({error: 'Server error'}, 500);
      console.error(err);
      throw err;
		});
	},
	
};

