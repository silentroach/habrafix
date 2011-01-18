/**
 * Kalashnikov Igor <igor.kalashnikov@gmail.com>
 * Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported
 */
 
/**
 * @param {HTMLElement|Array.<HTMLElement>|string} selector Селектор или элемент
 * @param {?HTMLElement} context Контекст поиска
 * @return {Object}
 */
var $ = function(selector, context) {

	var 
		/**
		 * @type {HTMLElement}
		 */
		doc = context || document,
		/**
		 * @type {HTMLElement|Array.<HTMLElement>|boolean}
		 */
		element = typeof selector == 'string' ? false : selector;

	return {
		/**
		 * @return {?Array.<HTMLElement>}
		 */
		all: function() {
			return doc.querySelectorAll(selector);
		},
		/**
		 * @return {?HTMLElement}
		 */
		first: function() {
			return doc.querySelector(selector);
		},
		/**
		 * Пробежаться по элементам
		 * @param (function(HTMLElement)} callback
		 * @return 
		 */
		each: function(callback) {
			element = element || this.all();
			
			if (element.lenght) {
				element.forEach(callback);
			}
		}
	};

};