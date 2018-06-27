function getQueryString() {
	var qs = location.search.slice(1), // search为空串也OK
			args = {},
			items = qs.length ? qs.split('&') : [],
			key = null,
			value = null,
			kv = null;
	
	for (var i = 0, len = items.length; i < len; ++i) {
		kv = items[i].split('=');
		key = decodeURIComponent(kv[0]);
		value = decodeURIComponent(kv[1]);
		if (key.length) {
			args[key] = value;
		}
	}
	return args;
}