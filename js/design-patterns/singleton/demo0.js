var Person = function () {
	var instance = null;
	function _Person(name) {
		// 虽然讲不符合单一原则职责, 但考虑到其他方案还需要创建更多闭包或产生更多函数调用
		// 这里逻辑足够简单, 也不是什么大问题
		if (instance) {
			return instance;
		}
		var self = this instanceof _Person ? this : Object.create(_Person.prototype);
		self.name = name;
		instance = self;
		return instance;
	}
	return _Person;
}();

var a = new Person('aaa');
var b = new Person('bbb');
console.log(a.name);
console.log(b.name);
console.log(a === b);