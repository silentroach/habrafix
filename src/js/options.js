/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.options = ( function() {

	var optionPath = function(path) {
		return 'option_' + path;
	};

	var trigger = function(path, defaultValue) {
		var tr = this;

		tr.setValue = function(value) {
			localStorage.setItem(optionPath(path), value ? 1 : 0);
		};

		tr.value = function() {
			var tmp = localStorage.getItem(optionPath(path));
			
			if (!tmp) {
				tmp = defaultValue;

				tr.setValue(tmp);
			} else {
				tmp = parseInt(tmp) == 1 ? true : false;
			}

			return tmp;
		};
	};

	return opts = {

	};

} )();
