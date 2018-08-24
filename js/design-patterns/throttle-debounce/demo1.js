function debounce(fn, delay = 100, thisArg) {
	if (typeof fn !== 'function') {
		throw new TypeError('fn is not a function.');
	}
	// 同样, 考虑到后面返回的函数会被频繁调用, 则f的初始化放外面比放里面要好
	var handler = null, f = function (thisArg, args) {
		handler = null;
		fn.apply(thisArg, args);
	};
	return function () {
		var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);

		if (handler) {
			clearTimeout(handler);
		}
		handler = setTimeout(f, delay, thisArg, args);
	};
}