var Person = function () {
	function Person(name) {
		var self = this instanceof Person ? this : Object.create(Person.prototype);
		// public variable
		self.name = name;
		// private variable
		var age = 10;

		add();

		// private instance method can get this or other private variable but use more memory
		function greet(name) {
			console.log(`Hello, ${name}, I'm ${self.name}, I'm ${age} years old.`);
		}

		// public instance method
		if (typeof self.sayHello !== 'function') {
			Person.prototype.sayHello = function (name) {
				greet(name);
				greet2.call(self, name, age);
			};
		}

		return self;
	}

	// private instance method can get this by apply, call, use less memory, but
	// can't get other private variable
	function greet2(name, age) {
		console.log(`Hello, ${name}, I'm ${this.name}, I'm ${age} years old.`);
	}

	// static private variable
	var count = 0;

	// static private method
	var add = function () {
		++count;
	}

	// static public variable
	Person.getTotal = function () {
		return count;
	}

	return Person;
}();
