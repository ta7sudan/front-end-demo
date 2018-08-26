var Aspect = function () {
	function toArray(args) {
		// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
		return args.length === 1 ? [args[0]] : Array.apply(null, args);
	}

	function beforeAfter(type) {
		return function (fn, thisArg) {
			if (typeof fn !== 'function') {
				throw new TypeError('fn is not a function.');
			}
			this._list[type].push(fn.apply.bind(fn, thisArg));
			return this;
		};
	}

	function execEach(list, args) {
		var next = true;
		for (var i = 0, len = list.length; i < len; ++i) {
			if (!next) {
				break;
			}
			next = list[i](args) !== false;
		}
		return next;
	}

	function _Aspect(fn, thisArg) {
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}

		var f = function () {
			var args = toArray(arguments),
				beforeList = f._list.before,
				afterList = f._list.after,
				next,
				rst;

			next = execEach(beforeList, args);

			if (!next) return;

			rst = fn.apply(thisArg, args);

			execEach(afterList, args);

			return rst;
		};

		f.before = beforeAfter('before').bind(f);
		f.after = beforeAfter('after').bind(f);

		Object.defineProperties(f, {
			'_list': {
				value: {
					before: [],
					after: []
				},
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