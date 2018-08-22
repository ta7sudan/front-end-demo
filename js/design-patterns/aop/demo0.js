var Aspect = function () {
	function toArray(args) {
		// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
		return args.length === 1 ? [args[0]] : Array.apply(null, args);
	}

	function before(fn, thisArg) {
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}
		this.__privateBeforeList.push(fn.apply.bind(fn, thisArg));
		return this;
	}

	function after(fn, thisArg) {
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}
		this.__privateAfterList.push(fn.apply.bind(fn, thisArg));
		return this;
	}

	function _Aspect(fn, thisArg) {
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}

		var f = function () {
			var args = toArray(arguments),
				beforeList = f.__privateBeforeList,
				afterList = f.__privateAfterList;
			while (beforeList.length) {
				beforeList.shift()(args);
			}

			var rst = fn.apply(thisArg, args);

			while (afterList.length) {
				afterList.shift()(args);
			}

			return rst;
		};

		f.before = before.bind(f);
		f.after = after.bind(f);

		Object.defineProperties(f, {
			'__privateBeforeList': {
				value: [],
				writable: true,
				enumerable: false
			},
			'__privateAfterList': {
				value: [],
				writable: true,
				enumerable: false
			}
		});

		return f;
	}

	return _Aspect;
}();


var obj = {
	name: 'aaa',
	sayName(greeting) {
		console.log(greeting, this.name);
		return 'ok';
	}
};

var sayName0 = Aspect(obj.sayName, obj).before(function (greeting) {
	console.log(greeting, 'before 0');
}).after(function (greeting) {
	console.log(greeting, 'after 0');
}).before(function (greeting) {
	console.log(greeting, 'before 1');
}).after(function (greeting) {
	console.log(greeting, 'after 1');
});

var result = sayName0('hello');
console.log(result);

console.log('*******************');

var aop = Aspect(obj.sayName, obj);
var before = aop.before;
var after = aop.after;

before(function (greeting) {
	console.log(this.name);
	console.log(greeting, 'before 0');
}, obj);
before(function (greeting) {
	console.log(greeting, 'before 1');
});
after(function (greeting) {
	console.log(greeting, 'after 0');
});

var sayName1 = after(function (greeting) {
	console.log(greeting, 'after 1');
});

result = sayName1('hello');
console.log(result);