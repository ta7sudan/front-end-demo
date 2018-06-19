function Person(name) {
	var self = this instanceof Person ? this : Object.create(Person.prototype);
	// public variable
	self.name = name;
	// private variable
	var age = 10;

	// private instance method can get this or other private variable but use more memory
	function greet(name) {
		console.log(`Hello, ${name}, I'm ${self.name}, I'm ${age} years old.`);
	}

	// public instance method
	if (typeof self.sayHello !== 'function') {
		Person.prototype.sayHello = function (name) {
			greet(name);
		};
	}

	return self;
}

function Student(name, book) {
	var self = this instanceof Student ? this : Object.create(Student.prototype);

	// 我继承一个 class, 却需要知道这个 class 的构造函数的参数, 好像有点说不过去
	Person.call(self, name);

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
