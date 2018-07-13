Math.max.apply(Math, [1, 2, 3]);
Math.min.apply(Math, [1, 2, 3]);

var func = function () {};
Object.prototype.toString.call(func) === '[object Function]';

function test() {
	if (true) {
		test = function () {
			console.log('test0');
		};
	} else {
		test = function () {
			console.log('test1');
		};
	}
	return test();
}

var test = function () {
	var test;
	if (true) {
		test = function () {
			console.log('test0');
		};
	} else {
		test = function () {
			console.log('test1');
		};
	}
	return test;
}();


function lazyIterate(arr, cb, intv, end, chunkSize) {
	if (!Array.isArray(arr)) {
		throw new TypeError('arr is not an Array');
	}
	var len = arr.length, i = 0, cz = chunkSize || 1, offsetEnd = 0;
	function run() {
		if (cz === 1) {
			cb(arr[i], i, arr);
			++i;
		} else {
			offsetEnd = i + cz; 
			var chunk = arr.slice(i, offsetEnd);
			cb(chunk, i, arr);
			i = offsetEnd;
		}
		i < len ? setTimeout(run, intv || 100) : typeof end === 'function' ? setTimeout(end) : null;
	}
	setTimeout(run);
}

/**
 * Duff 装置
 */
var data = Array.from({length: 100}, (v, k) => k),
		process = function (val) {
			console.log(val)
		};
var iterCount = Math.floor(data.length / 8),
		left = data.length % 8,
		i = 0;
if (left > 0) {
	do {
		process(data[i++]);
	} while (--left);
}
do {
	process(data[i++]);
	process(data[i++]);
	process(data[i++]);
	process(data[i++]);
	process(data[i++]);
	process(data[i++]);
	process(data[i++]);
	process(data[i++]);
} while (--iterCount);
