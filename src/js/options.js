/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
habrafix.config = ( function() {

	var ls = window.localStorage;

	var optionPath = function(path) {
		return 'option_' + path;
	};

	var trigger = function(path, defaultValue, caption) {
		var tr = this;

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

	return opts = {
		hideads: new trigger('hideads', false, 'Скрывать самую назойливую (сверху) рекламу'),
		treecomments: new trigger('treecomments', true, 'Древовидные комментарии'),
		showauthor: new trigger('showauthor', true, 'Выделять комментарии автора топика'),
		print: new trigger('print', true, 'Кнопка печати в топике'),
		etoolbar: new trigger('etoolbar', true, 'Показывать панель инструментов в редакторах')
	};

} )();
