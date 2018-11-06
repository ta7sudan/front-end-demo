var EventEmitter = function () {
	var _eventsMap = new WeakMap();
	var _msgMap = new WeakMap();
	function _EventEmitter() {
		var _events = {}, _msgs = {};
		_eventsMap.set(this, _events);
		_msgMap.set(this, _msgs);
	}
	_EventEmitter.prototype.addListener = function addListener(name, listener) {
		if (typeof listener !== 'function') {
			throw new TypeError('listener is not a function.');
		}
		var _events = _eventsMap.get(this),
			_msgs = _msgMap.get(this),
			msgs = _msgs[name];
		if (!_events[name]) {
			_events[name] = [];
		}
		_events[name].push(listener);
		if (!msgs) return;
		while (msgs.length) {
			var msg = msgs.shift();
			this.emit(name, ...msg);
		}
	};
	_EventEmitter.prototype.emit = function emit(name, ...args) {
		var _events = _eventsMap.get(this),
			_msgs = _msgMap.get(this),
			evs = _events[name];

		if (!evs) {
			_msgs[name] = [];
			_msgs[name].push(args);
			return;
		}
		process.nextTick(() => {
			for (var i = 0, len = evs.length; i < len; ++i) {
				evs[i].apply(this, args);
			}
			if (_msgs[name]) {
				_msgs[name] = null;
			}
		});
	};
	_EventEmitter.prototype.removeListener = function removeListener(name, listener) {
		var _events = _eventsMap.get(this),
			evs = _events[name];
		if (!evs) {
			throw new Error('no such event');
		}
		var pos = evs.indexOf(listener);
		if (pos !== -1) {
			evs.splice(pos, 1);
		}
		if (!evs.length) {
			_events[name] = null;
		}
	};
	return _EventEmitter;
}();

var e = new EventEmitter();
	e.addListener('test', function (a, b) {
		console.log(a, b);
	});
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