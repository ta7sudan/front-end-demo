function Command(receiver) {
	return function () {
		receiver.doSth();
	};
}

var a = {
	doSth() {
		console.log('test');
	}
};

var b = {
	sendCommand(cmd) {
		cmd();
	}
};

b.sendCommand(Command(a));