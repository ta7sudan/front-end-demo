function encodeBase64(str) {
	return Buffer.from(str).toString('base64');
}

function decodeBase64(str) {
	return Buffer.from(str, 'base64').toString();
}

// 这两个方法适用于较短的数据, 大量数据的情况下,
// 一方面是Buffer有1G/32bit或2G/64bit的限制,
// 另一方面是Buffer全部读入内存导致内存占用高,
// 这种情况下考虑自己实现流或使用string_decoder模块,
// 服务器上使用这两个函数务必校验或限制参数的长度,
// 以免被人构造恶意参数把内存搞爆导致DOS