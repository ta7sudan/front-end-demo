var Aspect = function () {
	var beforeListMap = new WeakMap(),
		afterListMap = new WeakMap();
	
	function toArray(args) {
		// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
		return args.length === 1 ? [args[0]] : Array.apply(null, args);
	}

	function before(fn, thisArg) {
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}
		var beforeList = beforeListMap.get(this);
		beforeList.push(fn.apply.bind(fn, thisArg));
		return this;
	}

	function after(fn, thisArg) {
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}
		var afterList = afterListMap.get(this);
		afterList.push(fn.apply.bind(fn, thisArg));
		return this;
	}

	function _Aspect(fn, thisArg) {
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}

		var f = function () {
			var args = toArray(arguments),
				beforeList = beforeListMap.get(f),
				afterList = afterListMap.get(f),
				bLen = beforeList.length,
				aLen = afterList.length,
				i;

			for (i = 0; i < bLen; ++i) {
				beforeList[i](args);
			}

			var rst = fn.apply(thisArg, args);

			for (i = 0; i < aLen; ++i) {
				afterList[i](args);
			}

			return rst;
		};

		f.before = before.bind(f);
		f.after = after.bind(f);

		beforeListMap.set(f, []);
		afterListMap.set(f, []);

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