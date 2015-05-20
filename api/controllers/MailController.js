/**
 * MailController
 *
 * @description :: Server-side logic for managing Mails
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var Promise = require('bluebird');

module.exports = {
	sendOrderToDriver: function(req, res) {
		var orderId = req.params.id;

		promise = Orders.find(orderId);

		promise.then(function(order) {
			var order = order[0];
			var userId = order.driverId;
			var customerId = order.customerId;

			promise = Customers.find(customerId);
	
			promise.then(function(customer) {
				var customer = customer[0];
	
				promise = Users.find(userId);
		
				promise.then(function(user) {
					var user = user[0];
					var email = user.phone + '@vtext.com';
					var dataObj = {};
					dataObj.order = order;
					dataObj.customer = customer;
					sendMail(email, 'Dispatch!', 'dispatch', dataObj);
				});
			});
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

function sendMail(email, subject, template, data) {
	var p = Promise.defer();

	var transporter = nodemailer.createTransport(directTransport());

	var mailOptions = {
			from: 'Grub2You <info@grub2you.com>',
			to: email,
			subject: subject,
			text: '',
			html: ''
		};

	if(template == 'apply') {
		mailOptions = {
			from: 'Grub2You Careers <careers@grub2you.com>',
			to: email,
			subject: subject,
			text: 'Thanks for applying for the role of '+data.position+', '+data.fName+'.  A Grub2You team member will contact you soon!',
			html: 'Thanks for applying for the role of <b>'+data.position+'</b>, '+data.fName+'.  A Grub2You team member will contact you soon!'
		};
	}

	if(template == 'order') {
		mailOptions = {
			from: 'Grub2You Orders <orders@grub2you.com>',
			to: email,
			subject: subject,
			text: 'Thanks for ordering with Grub2You!, '+data.fName+'.  A Grub2You team member will deliver your order very soon!',
			html: 'Thanks for ordering with <b>Grub2You</b>, '+data.fName+'.  A Grub2You team member will deliver your order very soon!'
		};
	}

	if(template == 'signup') {
		mailOptions = {
			from: 'Grub2You <info@grub2you.com>',
			to: email,
			subject: subject,
			text: 'Thanks for joining Grub2You, '+data.fName+'.  We\'re glad you found us! How about a little discount off your first order? Just enter promo code \'yummy\' when you place your order!',
			html: 'Thanks for joining <b>Grub2You</b>, '+data.fName+'.  We\'re glad you found us!<br/>How about a little discount off your first order? Just enter promo code <b>\'yummy\'</b> when you place your order!',
		};
	}

	if(template == 'update') {
		mailOptions = {
			from: 'Grub2You <info@grub2you.com>',
			to: email,
			subject: subject,
			text: 'Your order has been collected from the restaurant and is on the way!'
		};
	}

	if(template == 'dispatch') {

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

		mailOptions = {
			from: 'Grub2You Dispatch <dispatch@grub2you.com>',
			to: email,
			subject: subject,
			text: 'Order ready for pickup ' + readyMins + ' for delivery to '+address+' - grub2you.com:3001/#/dispatch'
		};
	}

	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			return p.reject(err);
		}

		console.log('message sent');
		p.resolve(info);
	});

	return p.promise;
}

