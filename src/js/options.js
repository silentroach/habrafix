/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.configOption = function(path, defaultValue, caption) {
	var tr = this;

	var ls = window.localStorage;

	var optionPath = function(path) {
		return 'option_' + path;
	};

	tr.caption = function() {
		return caption;
	};

	tr.setValue = function(value) {
		ls.setItem(optionPath(path), value ? 1 : 0);
	};

	tr.value = function() {
		var tmp = ls.getItem(optionPath(path));
		
		if (!tmp) {
			tmp = defaultValue;

			tr.setValue(tmp);
		} else {
			tmp = parseInt(tmp) == 1 ? true : false;
		}

		return tmp;
	};
};

habrafix.config = { };
