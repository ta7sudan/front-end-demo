function Person(name, age) {
	var self = this instanceof Person ? this : Object.create(Person.prototype);
	// public variable
	self.name = name;
	self.age = age;

	// public method
	if (typeof self.sayHello !== 'function') {
		Person.prototype.sayHello = function (name) {
			console.log(`Hello, ${name}, I'm ${this.name}, I'm ${this.age} years old.`);
		};
	}

	return self;
}

function Student(name, age, book) {
	var self = this instanceof Student ? this : Object.create(Student.prototype);

	// 我继承一个 class, 却需要知道这个 class 的构造函数的参数, 好像有点说不过去
	Person.call(self, name, age);

	self.book = book;

	if (typeof self.getBook !== 'function') {
		Student.prototype.getBook = function () {
			return this.book;
		};
	}

	return self;
}


function inheritPrototype(subType, superType) {
	subType.prototype = Object.create(superType.prototype);
	subType.prototype.constructor = subType;
}

inheritPrototype(Student, Person);

var a = new Student('aaa', 16, 'SICP');
var b = new Student('bbb', 18, 'CSAPP');
console.log(a.name);
console.log(a.age);
console.log(a.book);
console.log(b.name);
console.log(b.age);
console.log(b.book);