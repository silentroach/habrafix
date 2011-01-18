/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
/**
 * @param {string} selector Селектор
 * @param {?HTMLElement} context Контекст поиска
 */
$ = function(selector, context) {

	var 
		/**
		 * @type {HTMLElement}
		 */
		doc = context || document;

	return {
		all: function() {
			return doc.querySelectorAll(selector);
		},
		first: function() {
			return doc.querySelector(selector);
		}
	};

};