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
		if(env && env == 'production') {
			var messageId = req.params.id;

			messagePromise = Messages.find(messageId);
	
			messagePromise.then(function(message) {

				// TODO: cheating here - want to call Emails.areaIdActive(message.areaId)
				emailsPromise = Emails.find();

				emailsPromise.then(function(emails) {
					console.log('there are '+emails.length+' email addresses in this list');
					// TODO: cheating here, too - see above
					emails.forEach(function(email) {
						if(email.active) {
							sendMail(email.email, 'Howdy!', 'cta', message.content);
						}
					});
				});
			});
		}
	},

	sendText: function(req, res) {
		if(env && env == 'production') {
			var messageId = req.params.id;

			messagePromise = Messages.find(messageId);
	
			messagePromise.then(function(message) {

				// TODO: cheating here - want to call Phones.areaIdActive(message.areaId)
				phonesPromise = Phones.find();

				phonesPromise.then(function(phones) {
					console.log('there are '+phones.length+' phone numbers in this list');
					// TODO: cheating here, too - see above
					phones.forEach(function(phone) {
						if(phone.active) {
							var qPhone = phone.phone.toString() + '@vtext.com';
							sendMail(qPhone, 'Howdy!', 'cta', message.content);
						}
					});
				});
			});
		}
	},
};

function sendMail(email, subject, template, content) {
	var p = Promise.defer();

	var transporter = nodemailer.createTransport(directTransport());

	var mailOptions = {
			from: 'Grub2You <info@grub2you.com>',
			to: email,
			subject: subject,
			text: '',
			html: ''
		};

	if(template == 'cta') {
		mailOptions = {
			from: 'Grub2You <orders@grub2you.com>',
			to: email,
			subject: subject,
			text: content,
			html: content
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

