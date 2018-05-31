// from https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding

function encodeBase64(str) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (m, p) {
		return String.fromCharCode('0x' + p);
	}));
}

function decodeBase64(str) {
	return decodeURIComponent(atob(str).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));
}
