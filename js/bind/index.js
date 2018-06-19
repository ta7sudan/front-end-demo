// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}
    var aArgs = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)),
			nop = aArgs.shift(),
			fToBind = this,
			fNOP    = function() {},
			fBound  = function() {
				return fToBind.apply(this instanceof fNOP
					? this
					: oThis,
					aArgs.concat(arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments)));
			};

		if (this.prototype) {
			fNOP.prototype = this.prototype; 
		}
		fBound.prototype = new fNOP();

		return fBound;
	};
}

