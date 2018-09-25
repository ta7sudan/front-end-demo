var EventEmitter = function () {
	var _eventsMap = new WeakMap();
	function _EventEmitter() {
		var _events = {};
		_eventsMap.set(this, _events);
	}
	_EventEmitter.prototype.addListener = function addListener(name, listener) {
		if (typeof listener !== 'function') {
			throw new TypeError('listener is not a function.');
		}
		var _events = _eventsMap.get(this);
		if (!_events[name]) {
			_events[name] = [];
		}
		_events[name].push(listener);
	};
	_EventEmitter.prototype.emit = function emit(name, ...args) {
		var _events = _eventsMap.get(this), evs = _events[name];
		if (!evs) {
			throw new Error('no such event');
		}
		for (var i = 0, len = evs.length; i < len; ++i) {
			// 考虑到可能存在的继承还是绑下this比较好
			evs[i].apply(this, args);
		}
	};
	_EventEmitter.prototype.removeListener = function removeListener(name, listener) {
		var _events = _eventsMap.get(this), evs = _events[name];
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