就 js 来讲, 如果只是简单的一个命令发送者, 发送一个命令给命令接收者, 命令接收者接收命令之后执行动作, 考虑命令发送者, 命令接收者, 命令, 这三个实体, 其实事件已经够用了. 看下面简单的命令模式.

```javascript
function Command(receiver) {
	this.receiver = receiver;
}

Command.prototype.execute = function () {
	this.receiver.doSth();
};

var a = {
	doSth() {
		console.log('test');
	}
};

var cmd = new Command(a);

var b = {
	sendCommand(cmd) {
		cmd.execute();
	}
};

b.sendCommand(cmd);

// 或者
function Command(receiver) {
	return function () {
		receiver.doSth();
	};
}

var a = {
	doSth() {
		console.log('test');
	}
};

var b = {
	sendCommand(cmd) {
		cmd();
	}
};

b.sendCommand(Command(a));
```

其实改成下面这样看起来反而更简单.

```javascript
var a = {
	doSth() {
		console.log('test');
	}
};


var b = {
	sendCommand(doSth) {
		doSth();
	}
};

b.sendCommand(a.doSth);
```

但是我们也知道, 这样的话, b 就需要知道 a 的存在, 带来了耦合, 而 cmd 充当一个中立第三方, 它的接口是大家都知道的, 就像 Promise 那样, 解除了 a 和 b 的耦合. 但就这一点来说, 也不足以让我们使用命令模式, 因为使用 event 也能做到.

```javascript
const EventEmitter = require('events');
var e = new EventEmitter();
var a = {
	e,
	doSth() {
		console.log('test');
	},
	addListener(name, listener) {
		e.addListener(name, listener.bind(this));
	}
};
a.addListener('cmd', function () {
	this.doSth();
});

var b = {
	sendCommand() {
		e.emit('cmd');
	}
};

b.sendCommand();
```

这里 e 也充当了一个中立第三方的角色, 从这几点看来, 都没有必要封装一个单独的 `Command`.

但是事件提供的接口很有限, 而回调又容易耦合, 当你想要一些其他功能的时候, 就需要命令模式了, 比如 undo 和 redo, 又或者宏命令, 我们可以把多个命令放到栈中来实现 undo, redo, 也可以将多个命令存入一个 List 作为一个宏命令. 当然, 其实在函数是 first class 的 js 中, 也依然可以不用专门创建一个 `Command` 类, 直接存入相应函数就好了, 从这点来说, `Command` 的意义大概是看起来更容易让人理解意图吧.