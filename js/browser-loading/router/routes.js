const fs = require('fs');
const path = require('path');

function sleep(time) {
	return new Promise(rs => setTimeout(rs, time));
}

module.exports = {
	'get /demo': async (ctx, next) => {
		const respBody = fs.readFileSync(path.resolve(__dirname, '../resources/demo.html'));
		ctx.respond = false;
		ctx.res.setHeader('Content-Type', 'text/html');
		ctx.res.statusCode = 200;
		ctx.res.write(respBody);
		await sleep(3000);
		ctx.res.end();
	},
	'get /js0-delay-3000': async (ctx, next) => {
		const respBody = fs.readFileSync(path.resolve(__dirname, '../resources/js0.js'));
		ctx.respond = false;
		ctx.res.setHeader('Content-Type', 'application/javascript');
		ctx.res.statusCode = 200;
		ctx.res.write(respBody);
		await sleep(3000);
		ctx.res.end();
	},
	'get /js1-delay-4000': async (ctx, next) => {
		const respBody = fs.readFileSync(path.resolve(__dirname, '../resources/js1.js'));
		ctx.respond = false;
		ctx.res.setHeader('Content-Type', 'application/javascript');
		ctx.res.statusCode = 200;
		ctx.res.write(respBody);
		await sleep(4000);
		ctx.res.end();
	},
	'get /js2-delay-3000': async (ctx, next) => {
		const respBody = fs.readFileSync(path.resolve(__dirname, '../resources/js1.js'));
		ctx.respond = false;
		ctx.res.setHeader('Content-Type', 'application/javascript');
		ctx.res.statusCode = 200;
		ctx.res.write(respBody);
		await sleep(3000);
		ctx.res.end();
	},
	'get /css-delay-3000': async (ctx, next) => {
		const respBody = fs.readFileSync(path.resolve(__dirname, '../resources/css0.css'));
		ctx.respond = false;
		ctx.res.setHeader('Content-Type', 'text/css');
		ctx.res.statusCode = 200;
		ctx.res.write(respBody);
		await sleep(3000);
		ctx.res.end();
	},
	'get /image-delay-3000': async (ctx, next) => {
		const respBody = fs.readFileSync(path.resolve(__dirname, '../resources/img0.jpg'));
		ctx.respond = false;
		ctx.res.setHeader('Content-Type', 'image/jpeg');
		ctx.res.statusCode = 200;
		ctx.res.write(respBody);
		await sleep(3000);
		ctx.res.end();
	}
};