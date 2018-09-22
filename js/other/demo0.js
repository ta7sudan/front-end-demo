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

// cb接受一个值, 返回一个Promise, 不过现在有async/await了, 这东西意义不大
function each(arr, cb) {
	return arr.reduce((rst, cur) => rst.then(() => cb(cur)), Promise.resolve());
}

// 蹦床
var factorial = function () {
	function trampoline(res) {
		while (typeof res === 'function') {
			res = res();
		}
		return res;
	}

	function _factorial(n, m) {
		if (n < 2) {
			return m;
		} else {
			return function partial() {
				return _factorial(n - 1, m * n);
			};
		}
	}

	return function (n) {
		return trampoline(_factorial(n, 1));
	}
}();

// 简单的range工具函数
function range(...args) {
	let len, start = 0, step = 1;
	if (args.length === 1) {
		len = args[0];
	} else if (args.length === 2) {
		start = args[0];
		len = args[1];
	} else {
		start = args[0];
		len = args[1];
		step = args[2];
	}
	return Array.from({length: len}, (v, k) => step * k + start);
}

// 封装随机数函数
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 随机生成指定长度的16进制字符串
function randHex(len) {
	return (~~(Math.random() * (1 << (4 * len)))).toString(16);
}

// 随机生成指定长度的数字字母字符串, 思路是可以, 不过长度不能太长, 否则超出数字范围, 只能简单场景用用
function randStr(len) {
	return Math.floor(Math.random() * Math.pow(36, len)).toString(36).slice(-len);
}


// String.prototype.repeat()的不完全替代品, 缺点是要创建一个稀疏数组, 简单场景可以用用
function repeat(str, n) {
	return new Array(n + 1).join(str);
}

// 生成指定长度的数字前补0的字符串
function fillZero(num, len) {
	return (Array(len).join('0') + num).slice(-len);
}

// 得到一个将array-like转数组的函数, 不过现在已经有Array.from了
var toArray = Function.call.bind(Array.prototype.slice);
toArray(arguments);


// 对字符串做HTML转义...只适用于浏览器环境
function escapeHTML (s) {
    return new Option(s).innerHTML;
}

// 浅复制数组
var newArr = [1, 2, 3].slice();
var newArr = [1, 2, 3].concat();

// uncurry
function uncurry(fn) {
	return Function.call.bind(fn);
}

// 给数组降一维, 简单场景不考虑时间空间开销的时候可用
var reduceDimension = Function.apply.bind(Array.prototype.concat);
reduceDimension([], [[1, 2, 3], [4, 5, 6]]);

// 我们知道合并数组用concat, 但这是创建一个新数组而不改变原有数组
var newArr = [1, 2, 3].concat([4, 5, 6]);
// 如果希望不创建新数组
arr0.push.apply(arr0, arr1);

// 创建一个100个元素的密集数组
Array.from({length:100})
Array.apply(null,{length:100})

// 生成100个值从0-99的元素
Object.keys(Array.apply(null,{length:100}))
Array.from(Array(100).keys()) 
var a = [...Array(100).keys()];
Array.from({ length: 100 }, (v, k) => k)


// optional chaining
function pointer(obj, path = []) {
	const value = defaultValue => {
		let val = obj;
		while (val != null && path.length && (val = val[path.shift()]));
		return val == null ? defaultValue : val;
	};
	return new Proxy(value, {
		get(target, key) {
			path.push(key);
			return pointer(obj, path);
		}
	});
}