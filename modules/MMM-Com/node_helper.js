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
      console.log('MMM-Com logging', req);
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'Blank Screen') {
			this.sendSocketNotification('Night Mode');
		}
	},

});