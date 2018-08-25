其实个人不觉得代理值得专门作为一个设计模式被提出来, 因为代理的种类很多, 它们的思想其实很不一样. 当然, 不管怎么说, 它们还是有那么一丢丢的共同点, 那就是单一职责原则, 其实脱离了这个原则的话, 不同的代理其实都是一些很独立的设计思想, 和代理的关系感觉也不大了.

这里还是先从单一职责原则开始吧.

> 单一职责原则指的是, 就一个类(通常也包括对象和函数)而言, 应该仅有一个引起它变化的原因. 如果一个对象承担了多项职责, 就意味着这个对象将变得巨大, 引起它变化的原因可能有多个.

这有点像是 UNIX 一个工具只做好一件事的原则, 简单来讲, 对于一个实体, 只有单一变量会引起它的变化. 从函数的角度而言, 如果这个实体是个函数, 那其实就意味着这是一个纯函数. 从封装变化的角度, 其实就是把每个变化都封装了起来, 而不是把多个变化封装在一起.

下面看一个简单的例子.

```javascript
var obj = {
	greeting(name) {
		console.log(`Hello! ${name}`);
	}
};

var pObj = new Proxy(obj, {
	get(target, key) {
		if (key === 'greeting') {
			return function (name) {
				if (typeof name !== 'string') {
					throw new TypeError('name is not a string.');
				}
				return target[key](name);
			};
		}
	}
});

pObj.greeting('tom');
```

这里我们用原生的 `Proxy` 创建了一个代理对象, 代理对象对 `greeting()` 方法做了参数类型检查. 从实际应用的角度来讲这没什么必要, 但是这体现了单一职责原则, 即原对象的 `greeting()` 只负责打印问候语, 而不必处理参数类型检查, 代理对象负责对 `greeting()` 的参数类型进行检查.

代理的核心思想就这么多, 维护单一职责原则.

从这个例子中我们也可以看到, 并不是什么时候都应当使用代理, 事实上这样的参数类型检查, 大部分时候我们都不会去使用代理, 毕竟类型检查并不是很复杂的逻辑, 多加一层代理不论是从代码量还是从性能开销来说都多了一些, 对于这样的情况我们往往选择不做代理, 尽管这样破坏了单一职责原则.

书上主要讲了保护代理, 虚拟代理和缓存代理这几种代理, 但其实它们都只是在代理的基础上增加了其他的思想. 像上面这样的代理称为保护代理, 即主要负责过滤一些不符合条件的东西.

而虚拟代理其实就是一个基于延迟计算思想的代理. 比如.

```javascript
var obj = {
	greeting(name) {
		console.log(`Hello! ${name}`);
	}
};

var pObj = new Proxy(obj, {
	get(target, key) {
		if (key === 'greeting') {
			return function (name) {
				setTimeout(target[key], 1000, name);
			};
		}
	}
});

pObj.greeting('tom');
```

我们在通过代理调用 `greeting()` 的时候并非马上执行打印, 而是延迟了 1 秒钟才执行. 这常用于一些开销较大的调用, 并且对返回结果没有实时性的要求的场景.

前面说过, 代理不仅仅是对对象进行代理, 也可以是函数的代理, 或其他实体. 从这个角度来说, 我们常见的节流和防抖也是一种虚拟代理.

```javascript
function debounce(fn, delay = 100, thisArg) {
	if (typeof fn !== 'function') {
		throw new TypeError('fn is not a function.');
	}
	var handler = null, f = function (thisArg, args) {
		handler = null;
		fn.apply(thisArg, args);
	};
	return function () {
		var args = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);

		if (handler) {
			clearTimeout(handler);
		}
		handler = setTimeout(f, delay, thisArg, args);
	};
}
```

它接受一个函数并返回一个功能一样的函数, 返回的函数其实就算是一个原函数的虚拟代理了, 只不过是调用的时候将原函数的调用延迟了.

缓存代理也就是基于缓存思想的代理, 其实 memoize 技术就是一种缓存代理, 只不过在设计模式的书上叫它缓存代理.

```javascript
function memoize(fn) {
	var cache = {};
	return function () {
		var key = JSON.stringify(arguments);
		cache[key] = cache[key] || fn.apply(this, Array.prototype.slice(arguments));
		return cache[]
	};
}
```

返回的函数功能同原函数一样, 只不过它会缓存计算结果.



#### 接口的一致性

在实现代理的时候, 最重要的一点就是代理和原实体接口必须一致, 脱离了这一点, 那上面的虚拟代理和缓存代理也就不算是代理了, 只能算是用到了延迟计算和缓存的思想.

一致性到底包含哪些要求? 通常来说是以下几点.

* 参数个数和参数类型一致
* 返回值类型一致
* 副作用
* `this`

对于函数来说, 副作用和 `this` 都可以算作是副作用吧, 这里稍稍区分一下. 其实这两个东西如果我们不关心它, 那也可以不用保持一致, 甚至有时候我们刻意需要它们不一致, 比如上面的虚拟代理, 我们原本是同步打印的, 变成了异步打印, 因为我们并不关心它是同步还是异步打印, 而虚拟代理的 `greeting()` 的参数和返回值都和原对象一致, 所以我们还是将它视为代理. 而如果调用打印的开销比较大, 我们甚至希望它不是同步立即调用的. 但是大部分时候, 如果没有这方面的需求, 个人还是倾向于保持副作用和 `this` 的一致.