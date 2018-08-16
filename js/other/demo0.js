// 求数组最值小技巧
Math.max.apply(Math, [1, 2, 3]);
Math.min.apply(Math, [1, 2, 3]);
Math.max(...[1, 2, 3]);

// 比较靠谱的类型判断
var func = function () { };
Object.prototype.toString.call(func) === '[object Function]';

// 惰性载入函数
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


// 分割任务
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
var data = Array.from({ length: 100 }, (v, k) => k),
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

// 获取正确的字符串长度
function getStrLength(str) {
	var rst = str.match(/[\s\S]/gu);
	return rst ? rst.length : 0;
}

// 检测正则表达式u修饰符支持
function hasRegExpU() {
	try {
		var pattern = new RegExp('.', 'u');
		return true;
	} catch (e) {
		return false;
	}
}

// 把一个多参函数变成一个单数组参数的函数
var add = Function.apply.bind(function (x, y) {
	return x + y;
}, null);
add([1, 2]);

// 检测是否是async函数
function isAsyncFunction(fn) {
	return fn[Symbol.toStringTag] === 'AsyncFunction';
}

// 检测是否是生成器函数
function isGenerator(fn) {
	return fn[Symbol.toStringTag] === 'GeneratorFunction';
}