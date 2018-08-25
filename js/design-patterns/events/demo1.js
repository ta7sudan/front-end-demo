var EventEmitter = function () {
	var _eventsMap = new WeakMap();
	var _msgMap = new WeakMap();
	function _EventEmitter() {
		var _events = {}, _msgs = {};
		_eventsMap.set(this, _events);
		_msgMap.set(this, {});
	}
	_EventEmitter.prototype.addListener = function addListener(name, listener) {
		var _events = _eventsMap.get(this);
		var _msgs = _msgMap.get(this);
		if (!_events[name]) {
			_events[name] = [];
		}
		_events[name].push(listener);
		if (_msgs[name].length) {
		}
		while (_msgs[name].length) {
			var msg = _msgs[name].shift();
			this.emit(name, ...msg);
		}
	};
	_EventEmitter.prototype.emit = function emit(name, ...args) {
		var _events = _eventsMap.get(this);
		var _msgs = _msgMap.get(this);
		if (!_events[name]) {
			_events[name] = [];
			_msgs[name] = [];
			_msgs[name].push(args);
			return;
		}
		for (var i = 0, len = _events[name].length; i < len; ++i) {
			_events[name][i](...args);
		}
	};
	_EventEmitter.prototype.removeListener = function removeListener(name, listener) {
		var _events = _eventsMap.get(this);
		if (!_events[name]) {
			throw new Error('no such event');
		}
		var pos = _events[name].indexOf(listener);
		if (pos !== -1) {
			_events[name].splice(pos, 1);
		}
	};
	return _EventEmitter;
}();

var e = new EventEmitter();
e.emit('test', 1, 2);

setTimeout(() => {
	e.addListener('test', function (a, b) {
		console.log(a, b);
	});
	e.addListener('test', function (a, b) {
		console.log(a, b);
	});
	e.emit('test', 3, 4);
}, 3000)