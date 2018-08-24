var {rAF, cancelRAF} = function () {
	var startTime = +new Date;
	function rAF(fn) {
		var time;
		if (typeof fn !== 'function') {
			throw new TypeError('fn is not a function.');
		}
		time = typeof performance !== 'undefined' && typeof performance.now !== 'function' ? +new Date - startTime : performance.now();
		return setTimeout(function () {
			fn(time);
		}, 17);
	}

	return {
		rAF: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || polyfillRAF,
		cancelRAF: window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout
	};
}();


var Animate = function () {
	var tween = {
		linear(t, b, c, d) {
			return c * t / d + b;
		},
		easeIn(t, b, c, d) {
			return c * (t /= d) * t + b;
		},
		strongEaseIn(t, b, c, d) {
			return c * (t /= d) * t * t * t * t + b;
		},
		strongEaseOut(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
		},
		sineaseIn(t, b, c, d) {
			return c * (t /= d) * t * t + b;
		},
		sineaseOut(t, b, c, d) {
			return c * ((t = t / d - 1) * t * t + 1) + b;
		}
	};

	function _Animate(el) {
		var self = this instanceof _Animate ? this : Object.create(_Animate.prototype);
		self.dom = el;
		self.startTime = 0;
		self.startPos = 0;
		self.endPos = 0;
		self.propertyName = null;
		self.easing = null;
		self.duration = null;
		return self;
	}

	function __step(ctx) {
		var t = +new Date;
		if (t >= ctx.startTime + ctx.duration) {
			__update(ctx, ctx.endPos);
			return false;
		}
		var pos = ctx.easing(t - ctx.startTime, ctx.startPos, ctx.endPos - ctx.startPos, ctx.duration);
		__update(ctx, pos);
	}

	function __setTransform(el, translate, pos) {
		el.style.transform = translate + '(' + pos + 'px)';
		el.style.OTransform = translate + '(' + pos + 'px)';
		el.style.webkitTransform = translate + '(' + pos + 'px)';
		el.style.msTransform = translate + '(' + pos + 'px)';
		el.style.MozTransform = translate + '(' + pos + 'px)';
	}

	function __update(ctx, pos) {
		if (~ctx.propertyName.indexOf('translate')) {
			__setTransform(ctx.dom, ctx.propertyName, pos);
		} else if (ctx.propertyName === 'opacity') {
			ctx.dom.style.opacity = pos;
		} else {
			ctx.dom.style[ctx.propertyName] = pos + 'px';
		}
	}

	_Animate.prototype.start = function (opts, cb) {
		if (typeof cb !== 'function') {
			throw new TypeError('callback is not a function');
		}
		this.startTime = +new Date;
		this.startPos = opts.startPos;
		this.endPos = opts.endPos;
		this.propertyName = opts.propertyName;
		this.duration = opts.duration;
		this.easing = tween[opts.easing];

		var self = this;

		function run() {
			if (__step(self) === false) {
				cancelRAF(id);
				cb();
			} else {
				rAF(run);
			}
		}
		var id = rAF(run);
	};

	return _Animate;
}();

var main = document.getElementsByClassName('main')[0];
var animate = new Animate(main);

setTimeout(function () {
  animate.start({
    startPos: 0,
    endPos: 800,
    propertyName: 'translateX',
    duration: 3000,
    easing: 'easeIn'
  }, function () {
    console.log('end');
  });
}, 3000);
