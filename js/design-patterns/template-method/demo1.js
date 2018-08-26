/** 
 * 优点是没有强制使用继承了
 * 缺点是Coffee和Tea之间失去了关联性, 不过这个问题可以手动修复
*/
function Beverage(opts) {
	function boiWater() {
		console.log('把水煮沸');
	}
	var brew = typeof opts.brew === 'function' ? opts.brew : function () {
		throw new Error('必须传递brew方法');
	};
	var pourInCup = typeof opts.pourInCup === 'function' ? opts.pourInCup : function () {
		throw new Error('必须传递pourInCup方法');
	};
	var addCondiments = typeof opts.addCondiments === 'function' ? opts.addCondiments : function () {
		throw new Error('必须传递addCondiments方法');
	};

	function f() {
		
	}
	f.prototype.init = function () {
		boiWater();
		brew();
		pourInCup();
		addCondiments();
	}

	return f;
}

var Coffee = Beverage({
	brew() {
		console.log('用沸水冲泡咖啡');
	},
	pourInCup() {
		console.log('把咖啡倒进杯子');
	},
	addCondiments() {
		console.log('加糖和牛奶');
	}
});
var coffee = new Coffee();
coffee.init();

var Tea = Beverage({
	brew() {
		console.log('用沸水冲泡茶叶');
	},
	pourInCup() {
		console.log('把茶倒进杯子');
	},
	addCondiments() {
		console.log('加柠檬');
	}
});
var tea = new Tea();
tea.init();