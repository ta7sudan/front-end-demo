var EventEmitter = function () {
	var _eventsMap = new WeakMap();
	function _EventEmitter() {
		var _events = {};
		_eventsMap.set(this, _events);
	}
	_EventEmitter.prototype.addListener = function addListener(name, listener) {
		var _events = _eventsMap.get(this);
		if (!_events[name]) {
			_events[name] = [];
		}
		_events[name].push(listener);
	};
	_EventEmitter.prototype.emit = function emit(name, ...args) {
		var _events = _eventsMap.get(this);
		if (!_events[name]) {
			throw new Error('no such event');
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
var f = new EventEmitter();
var a = function (a, b) {
	console.log(a, b);
}
e.addListener('test', a);
e.addListener('test', function test(a, b) {
	console.log(1, a, b);
});
f.addListener('test', a);

setTimeout(() => {
	e.emit('test', 1, 2);
	f.emit('test', 3, 4);
	e.removeListener('test', a);
}, 3000);

setTimeout(() => {
	e.emit('test', 1, 2);
}, 6000);