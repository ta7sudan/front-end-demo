var {rAF, cancelRAF} = function () {
	// 虽然其实这不是那么可靠, 不过也好过没有
	// Date.now要IE9+
	var startTime = +new Date;
	function rAF(fn) {
		var time;
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}
		time = typeof performance !== 'undefined' && typeof performance.now !== 'function' ? +new Date - startTime : performance.now();
		// setTimeout后面的参数要IE10+
		return setTimeout(function () {
			fn(time);
		}, 17);
	}

	return {
		rAF: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || polyfillRAF,
		cancelRAF: window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout
	};
}();