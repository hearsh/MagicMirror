

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
		return wrapper;
	},
	IPFinder: function(ip) {
		const mainContainer = document.getElementById(`${this.id}`);
		const wrapper = document.createElement("div");
		wrapper.style.position = 'absolute';
		wrapper.style.bottom = 0;
		wrapper.style.width = '100%';
		const text = document.createTextNode(`Visit http://${ip}:3000 If you are smart you will figure it out`);
		const para = document.createElement('p');
		para.style.fontSize = '20px';
		para.style.textAlign = 'center';
		para.appendChild(text);
		wrapper.appendChild(para);
		mainContainer.appendChild(wrapper);
	},
	noBlankScreen: function() {
		const wrapper = document.getElementById(`nightMode`);
		console.log(wrapper);
		if (wrapper) {
			wrapper.remove();
		}
	},
	blankScreen: function() {
		const mainContainer = document.getElementById(`${this.id}`);
		const wrapper = document.createElement("div");
		wrapper.id = 'nightMode';
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
			this.sendSocketNotification('Dom Started');
		}
	},
	socketNotificationReceived: function(notification, payload) {
		Log.log(this.name + " received a socket notification: " + notification + " - Payload: " + payload);
		if (notification === 'Night Mode') {
			this.blankScreen();
		}
		if (notification === 'Day Mode') {
			this.noBlankScreen();
		}
		if (notification === 'IP Address') {
			console.log('here', payload);
			this.IPFinder(payload);
		}
	}
});