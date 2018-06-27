// 如果只是需要简单地模拟setInterval, 这样就足够了, 缺点是不能clear掉,
// 多了一个this绑定参数, 不支持字符串参数, 没有返回值, 和setInterval行为不完全一致
function setIntv(fn, interval, oThis) {
	'use strict';
	if (typeof fn !== 'function') {
		throw new Error('callback is not a function.');
	}
	const cb = function () {
		fn.call(oThis);
		// 这里不建议使用下面的setTimeout, 会导致cb和setIntv之间产生循环引用
		// 虽然现在循环引用已经不会产生内存泄漏, 不过个人觉得还是尽量避免
		// 但是话又说回来, 如果用setIntv的话, 每次执行都会新创建一个cb, 也是有代价
		setIntv(fn, interval, oThis);
		// setTimeout(cb, interval);
	};
	setTimeout(cb, interval);
}

// 如果需要更好地模拟setInterval, 可以像下面这样, 支持clear,
// 缺点是不支持字符串参数, 返回值是number, 和node下不一致
const {setIntv, clearIntv} = function () {
	'use strict';
	const idMap = {};
	let idOffset = Date.now();
	return {
		setIntv: function setIv(fn, interval) {
			if (typeof fn !== 'function') {
				throw new Error('callback is not a function.');
			}
			// 为什么不每次用一个新时间戳作为id? 一方面是开销大, 另一
			// 方面是每次产生新时间戳作为id会小概率出现时间戳相同的情况,
			// 因为1ms对于CPU来说还是太长, 这样可以确保不会有相同时间戳出现
			const id = idOffset++;
			const cb = function () {
				fn();
				// 这里fn中可能clear掉, 此时不应该继续执行定时, 所以我们需要根据是否存在
				// id来决定是否需要继续定时
				if (typeof idMap[id] !== 'undefined') {
					// 这里就不用setIv了, 理论上来讲也不会出现内存泄漏, 用setIv会导致id重复生成
					// 以及带有返回值不好处理
					idMap[id] = setTimeout(cb, interval);
					// setIv(fn, interval, oThis);
				}
			};
			idMap[id] = setTimeout(cb, interval);
			return id;
		},
		clearIntv: function cleariv(id) {
			clearTimeout(idMap[id]);
			delete idMap[id];
		}
	};
}();
