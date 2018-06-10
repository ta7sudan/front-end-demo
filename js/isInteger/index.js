// from https://github.com/madmurphy/stringview.js
// 其中两个数字是 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER, 只不过 IE 和 Safari 支持度比较低
function isInteger(val) {
	return Number.isInteger ? Number.isInteger(val) : (typeof val === 'number' && isFinite(val) && val > -9007199254740992 && val < 9007199254740992 && Math.floor(val) === val)
}