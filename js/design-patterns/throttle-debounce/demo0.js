function throttle(fn, intv = 100) {
	if (typeof fn !== 'function') {
		throw new TypeError('fn is not a function');
	}
	// f在后面的函数中初始化也可以, 在这里初始化也可以,
	// 但是考虑后面的函数会频繁调用, 那在这里初始化要好一些, 闭包的开销反正少不了
	var handler = null, f = fn.apply.bind(fn);

	return function () {
		if (!handler) {
			// args可以在if外面初始化, 也可以在这里初始化, 但是在这里初始化要好一些
			var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
			// 确保fn总是被异步调用
			setTimeout(f, 0, this, args);
			handler = setTimeout(function () {
				handler = null;
			}, intv);
		}
	};
}