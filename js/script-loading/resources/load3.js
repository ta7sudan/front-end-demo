console.log('start load');
var js0 = document.createElement('script');
js0.textContent = 'console.log("js0")';
var js1 = document.createElement('script');
js1.textContent = `
console.log('js1 start');
var js2 = document.createElement('script');
js2.textContent = 'console.log("js2")';
document.body.appendChild(js2);
console.log('js1 end');
`;
document.body.appendChild(js1);
document.body.insertBefore(js0, document.currentScript);
console.log('end load');