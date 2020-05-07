/* global Module */

/* Magic Mirror
 * Module: MMM-syslog
 *
 * By Paul-Vincent Roll http://paulvincentroll.com
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
const url = require("url");
const fs = require("fs");

module.exports = NodeHelper.create({

	start: function() {
		this.expressApp.get('/MMM-com', (req, res) => {
			var query = url.parse(req.url, true).query;
			if (query.nightMode) {
				this.sendSocketNotification('Night Mode');
			} else {
				this.sendSocketNotification('Day Mode');
			}
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'Blank Screen') {
			// this.sendSocketNotification('Night Mode');
		}
	},

});