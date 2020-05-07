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
// Network interfaces
const ifaces = require('os').networkInterfaces();

// Iterate over interfaces ...
const adresses = Object.keys(ifaces).reduce(function (result, dev) {
  return result.concat(ifaces[dev].reduce(function (result, details) {
    return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
  }, []));
});

module.exports = NodeHelper.create({

	start: function() {
		this.expressApp.get('/MMM-com', (req, res) => {
			var query = url.parse(req.url, true).query;
			if (query.nightMode === 'true') {
				this.sendSocketNotification('Night Mode');
			} else {
				this.sendSocketNotification('Day Mode');
			}
		});
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'Dom Started') {
			this.sendSocketNotification('IP Address', adresses.replace('lo', ''));
		}
	},

});