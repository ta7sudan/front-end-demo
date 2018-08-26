/**
 * 优点是如果还有个Tea继承了Beverage, 则Coffee和Tea具有一定关联性, 它们都是同一父类,
 * 而缺点是继承是较高耦合的模式, 这里强制使用了继承
 */
function Beverage() {
	
}

Beverage.prototype.boilWater = function () {
	console.log('把水煮沸');
};

Beverage.prototype.brew = function () {
	throw new Error('子类必须重写brew方法');
};

Beverage.prototype.pourInCup = function () {
	throw new Error('子类必须重写pourInCup方法');
};

Beverage.prototype.addCondiments = function () {
	throw new Error('子类必须重写addCondiments方法');
};

Beverage.prototype.customerWantsCondiments = function () {
	return false;
};

Beverage.prototype.init = function () {
	this.boilWater();
	this.brew();
	this.pourInCup();
	if (this.customerWantsCondiments()) {
		this.addCondiments();
	}
};


/*****************************/
function Coffee() {
	
}

Coffee.prototype = Object.create(Beverage.prototype);

Coffee.prototype.brew = function () {
	console.log('用沸水冲泡咖啡');
};

Coffee.prototype.pourInCup = function () {
	console.log('把咖啡倒进杯子');
};
Coffee.prototype.addCondiments = function () {
	console.log('加糖和牛奶');
};
Coffee.prototype.customerWantsCondiments = function () {
	return true;
};

var coffee = new Coffee();
coffee.init();