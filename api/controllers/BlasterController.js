/**
 * BlasterController
 *
 * @description :: Server-side logic for managing message blasts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');
var Promise = require('bluebird');

var env = sails.config.environment;

module.exports = {
	sendEmail: function(req, res) {
		if(env && env === 'production') {
			var messageId = req.params.id;

			var today = new Date();

			var thisYear = today.getFullYear();
			var thisMonth = today.getMonth();
			var thisDate = today.getDate();

			var lastWeek = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime() - 604800000;
			var lastMonth = new Date(thisYear, thisMonth, thisDate, 0, 0, 0, 0).getTime() - (4 * 604800000);

			messagePromise = Messages.find(messageId);
	
			messagePromise.then(function(message) {
				var thisMessage = message[0];

				if(thisMessage.rType === 'all') {
					emailsPromise = Emails.find({active: true, areaId: thisMessage.areaId});
				}

				if(thisMessage.rType === 'never') {
					emailsPromise = Emails.find({hasOrdered: {$exists: false}, active: true, areaId: thisMessage.areaId});
				}

				if(thisMessage.rType === 'lastWeek') {
					emailsPromise = Emails.find({hasOrdered: true, mostRecentOrder: {$lte: lastWeek}, active: true, areaId: thisMessage.areaId});
				}

				if(thisMessage.rType === 'lastMonth') {
					emailsPromise = Emails.find({hasOrdered: true, mostRecentOrder: {$lte: lastMonth}, active: true, areaId: thisMessage.areaId});
				}

				emailsPromise.then(function(emails) {
					emails.forEach(function(email) {
						if(email.active) {
							sendMail(email.email, thisMessage.subject, 'generic', thisMessage);
						}
					});
					console.log('there are '+emails.length+' email addresses in this list');
				});
			});
		}
	},

	sendText: function(req, res) {
		if(env && env === 'production') {
			var messageId = req.params.id;

			messagePromise = Messages.find(messageId);
	
			messagePromise.then(function(message) {

				// TODO: cheating here - want to call Phones.areaIdActive(message.areaId)
				phonesPromise = Phones.find();

				phonesPromise.then(function(phones) {
					// TODO: cheating here, too - see above
					phones.forEach(function(phone) {
						if(phone.active) {
							var qPhone = phone.phone.toString() + '@vtext.com';
							sendMail(qPhone, 'Howdy!', 'cta', message[0]);
						}
					});
					console.log('there are '+phones.length+' phone numbers in this list');
				});
			});
		}
	},
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

	if(template === 'cta') {
		mailOptions = {
			from: 'Grub2You <info@grub2you.com>',
			to: email,
			subject: subject,
			text: data.content,
			html: data.content
		};
	}

	if(template === 'generic') {
		mailOptions = {
			from: 'Grub2You <info@grub2you.com>',
			to: email,
			subject: subject,
			text: data.content,
			html: data.content
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

