// from https://github.com/madmurphy/stringview.js
function isInteger(val) {
	return Number.isInteger ? Number.isInteger(val) : (typeof val === 'number' && isFinite(val) && val > -9007199254740992 && val < 9007199254740992 && Math.floor(val) === val)
}