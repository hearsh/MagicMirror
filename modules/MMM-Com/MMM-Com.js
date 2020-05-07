

Module.register('MMM-Com',{
	// Default module config.
	defaults: {
		text: 'Hello World!',
		id: 'MMM-Com'
	},
	loaded: function(callback) {
		this.finishLoading();
		Log.log(this.name + ' is loaded!');
		callback();
	},
	start: function() {
		console.log('Coms are on');
	},
	getDom: function() {
		const wrapper = document.createElement('div');
		wrapper.id = this.id;
		// MM.getModules().exceptModule(this).enumerate(function(module) {
		// 	module.hide(1000, function() {
		// 		//Module hidden.
		// 	});
		// });

		return wrapper;
	},
	getHeader: function() {
		return this.data.header + ' Foo Bar';
	},
	blankScreen: function() {
		const mainContainer = document.getElementById(`${this.id}`);
		const wrapper = document.createElement("div");
		wrapper.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
		wrapper.style.position = 'absolute';
		wrapper.style.top = 0;
		wrapper.style.width = '100%';
		wrapper.style.height = '100%';
		wrapper.style.zIndex = '9999999';
		mainContainer.appendChild(wrapper);
	},
	notificationReceived: function(notification, payload, sender) {
		if (sender) {
			Log.log(this.name + " received a module notification: " + notification + " from sender: " + sender.name);
		} else {
			Log.log(this.name + " received a system notification: " + notification);
		}
		if (notification === 'DOM_OBJECTS_CREATED') {
			this.sendSocketNotification('Blank Screen');
		}
	},
	socketNotificationReceived: function(notification, payload) {
		Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
		if (notification === 'Night Mode') {
			this.blankScreen();
		}
	}
});