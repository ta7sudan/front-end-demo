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

