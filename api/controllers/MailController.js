/**
 * MailController
 *
 * @description :: Server-side logic for managing Mails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = {
	sendOrderToDriver: function(req, res) {
		var orderId = req.params.id;

		var scope = {};

		return Orders.find(orderId).then(function(order) {
			scope.order = order[0];
			return Customers.find(scope.order.customerId);

		}).then(function(customer) {
			scope.customer = customer[0];
			return Users.find(scope.order.driverId);

		}).then(function(user) {
			var email = user[0].phone + '@vtext.com';
			return sendMail(email, 'Dispatch!', 'dispatch', scope);

		}).then(function(mailRes) {
			res.json(mailRes);

		}).catch(function(err) {
			res.json({success: false, error: err});
		});
	},

	sendUpdateToCustomer: function(req, res) {
		var customerId = req.params.id;

		promise = Customers.find(customerId);

		promise.then(function(customer) {
			var customer = customer[0];
			var email = customer.phone + '@vtext.com';
			sendMail(email, 'On the Way!', 'update', customer);
		});
	},

	sendConfirmationToCustomer: function(req, res) {
		var customerId = req.params.id;

		promise = Customers.find(customerId);

		promise.then(function(customer) {
			var customer = customer[0];
			sendMail(customer.email, 'Thanks for Joining Grub2You!', 'signup', customer);
		});
	},

	sendOrderToCustomer: function(req, res) {
		var customerId = req.params.id;

		promise = Customers.find(customerId);

		promise.then(function(customer) {
			var customer = customer[0];
			sendMail(customer.email, 'Thanks for Ordering!', 'order', customer);
		});
	},

	sendToApplicant: function(req, res) {
		var applicantId = req.params.id;

		promise = Applicants.find(applicantId);

		promise.then(function(applicant) {
			var applicant = applicant[0];
			sendMail(applicant.email, 'Thanks for Applying!', 'apply', applicant);
		});
	}
};

function getDispatchOptions(email, subject, template, data) {
	console.log('   ');
	console.log('data:');
	console.log(data);
	console.log('   ');
	var rests = [];
	data.order.things.forEach(function(thing) {
		if(rests.indexOf(thing.restaurantName) < 0) {
			rests.push(thing.restaurantName);
		}
	});
	
	var addRests = 0;
	if(rests.length > 1) {
		addRests = rests.length - 1;
	}
	
	var restNames = '';
	var firstName = true;
	rests.forEach(function(rest) {
		if(firstName) {
			restNames = rest;
			firstName = false;
		} else {
			if(rests.indexOf(rest) < addRests) {
				restNames = restNames + ', ' + rest;
			} else {
				restNames = restNames + ' and ' + rest;
			}
		}
	})

	var readyMins = 'now at ' + restNames;
	if(parseInt(data.order.readyMins) > 1) {
		readyMins = 'in ' + parseInt(data.order.readyMins) + ' minutes at ' + restNames;
	}

	var streetNum = data.customer.addresses.primary.streetNumber;
	var streetName = data.customer.addresses.primary.streetName;

	var address = streetNum+' '+streetName;

	if(!data.rando) {
		data.rando = 'joe123';
	}

	return '#'+data.rando+': Order ready ' + readyMins + ' for delivery to '+address;
}

function getMailOptions(email, subject, template, data) {
	var mailOptions = {
		from: 'Grub2You <info@grub2you.com>',
		to: email,
		subject: subject,
	};

	var templates = {
		apply: {
			text: 'Thanks for applying for the role of '+data.position+', '+data.fName+'.  A Grub2You team member will contact you soon!',
			html: 'Thanks for applying for the role of <b>'+data.position+'</b>, '+data.fName+'.  A Grub2You team member will contact you soon!'
		},
		order: {
			text: 'Thanks for ordering with Grub2You!, '+data.fName+'.  A Grub2You team member will deliver your order very soon!',
			html: 'Thanks for ordering with <b>Grub2You</b>, '+data.fName+'.  A Grub2You team member will deliver your order very soon!'
		},
		signup: {
			text: 'Thanks for joining Grub2You, '+data.fName+'.  We\'re glad you found us! How about a little discount off your first order? Just enter promo code \'yummy\' when you place your order!',
			html: 'Thanks for joining <b>Grub2You</b>, '+data.fName+'.  We\'re glad you found us!<br/>How about a little discount off your first order? Just enter promo code <b>\'yummy\'</b> when you place your order!'
		},
		update: {
			text: 'Your order has been collected from the restaurant and is on the way!'
		},
		dispatch: {
			text: getDispatchOptions
		}
	};

	_.forEach(templates[template], function(value, key) {
		if(_.isFunction(value)) {
			value = value(email, subject, template, data);
		}
		mailOptions[key] = value;
	});

	return mailOptions;
}

function sendMail(email, subject, template, data) {
	console.log('   ');
	console.log('sendMail() called');
	console.log('   ');
	var rando = Math.floor(Math.random()*100000001);
	var transporter = nodemailer.createTransport(directTransport());
//	var transport = require('nodemailer-smtp-transport');
//	var transporter = nodemailer.createTransport(
//		{
//			host: "smtp.gmail.com", // hostname
//			secure: true, // use SSL
//			port: 465, // port for secure SMTP
//			auth: {
//				user: "info@grub2you.com",
//				pass: "b00l@;b00l@"
//			}
//		}
//	);

	data.rando = rando;

	var mailOptions = getMailOptions(email, subject, template, data);

	console.log('   ');
	console.log('mailOptions:');
	console.log(mailOptions);
	console.log('   ');

	var p = Promise.defer();

	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			console.log('transporter.sendMail err:');
			console.log(err);
			return p.reject({success: false, err: err});
		}

		console.log('   ');
		console.log('message sent: #'+rando);
		console.log('   ');
		return p.resolve({success: true, info: info});
	});

	return p.promise;
}

