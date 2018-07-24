var Cookie = function () {
	function decode(s) {
		return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
	}
	function get(key) {
		var cookies = document.cookie ? document.cookie.split('; ') : [], rst = [];
		for (var i = 0, len = cookies.length; i < len; ++i) {
			var part = cookies[i].split('='),
				name = decode(part[0]),
				value = decode(part.slice(1).join('='));
			if (name === key) {
				rst.push(value);
			}
		}
		// 通常来说数组中第一个值会是当前path或离当前页path最近的path的cookie
		return rst.length ? rst.length === 1 ? rst[0] : rst : null;
	}
	function set(key, value, expires, path, domain, secure) {
		var k = encodeURIComponent(key.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
			v = encodeURIComponent(value.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape)),
			text = k + '=' + v,
			path = path || '/';
		if (expires instanceof Date) {
			// js中toUTCString和toGMTString是一样的
			// https://segmentfault.com/a/1190000006798626
			text += '; expires=' + expires.toUTCString();
		}
		text += '; path=' + path;
		if (domain) {
			text += '; domain=' + domain;
		}
		if (secure) {
			text += '; secure';
		}
		document.cookie = text;
	}
	return {
		get,
		set,
		remove(key, path, domain, secure) {
			set(key, '', new Date(0), path, domain, secure);
		}
	};
}();